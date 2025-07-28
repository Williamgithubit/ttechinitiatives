const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
admin.initializeApp();

// Create a Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

/**
 * Cloud Function to send a welcome email to new users
 */
exports.sendWelcomeEmail = functions.https.onCall(async (data, context) => {
  // Ensure the user is authenticated and has admin role
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated.'
    );
  }

  // Verify the user has admin role
  const userDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
  if (!userDoc.exists || userDoc.data().role !== 'admin') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only administrators can send welcome emails.'
    );
  }

  const { to, subject, text, html } = data;

  // Validate required fields
  if (!to || !subject || !text) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "to", "subject", and "text" parameters.'
    );
  }

  // Email options
  const mailOptions = {
    from: `"T-Tech Initiatives" <${functions.config().gmail.email}>`,
    to,
    subject,
    text,
    html: html || text, // Use HTML if provided, otherwise fall back to text
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to send email',
      error.message
    );
  }
});

/**
 * Cloud Function to send a password reset email
 */
exports.sendPasswordResetEmail = functions.https.onCall(async (data, context) => {
  const { email } = data;

  if (!email) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email is required.'
    );
  }

  try {
    // Generate password reset link
    const actionCodeSettings = {
      url: `${functions.config().app.url}/reset-password`,
      handleCodeInApp: true,
    };

    await admin.auth().generatePasswordResetLink(email, actionCodeSettings);
    
    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to send password reset email',
      error.message
    );
  }
});

/**
 * Triggered when a new user is created
 */
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  // Create a user document in Firestore
  const userRef = admin.firestore().collection('users').doc(user.uid);
  
  // Default role is 'student' unless specified otherwise
  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    role: 'student', // Default role
    emailVerified: user.emailVerified || false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await userRef.set(userData, { merge: true });
  
  console.log(`Created user document for ${user.email}`);
  return null;
});

/**
 * Triggered when a user is deleted
 */
exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
  // Delete the user's document from Firestore
  await admin.firestore().collection('users').doc(user.uid).delete();
  console.log(`Deleted user document for ${user.email}`);
  return null;
});
