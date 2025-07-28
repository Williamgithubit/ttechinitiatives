import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_ADMIN_SDK_KEY);

const adminApp = initializeApp({
  credential: cert(serviceAccount)
});

const adminAuth = getAuth(adminApp);
const db = getFirestore(adminApp);

async function createAdminUser() {
  const adminEmail = process.env.VITE_ADMIN_EMAIL;
  const adminPassword = process.env.VITE_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('Error: Admin email and password must be provided in .env file');
    process.exit(1);
  }

  try {
    // Create the user in Firebase Authentication
    const userRecord = await adminAuth.createUser({
      email: adminEmail,
      password: adminPassword,
      emailVerified: true
    });

    console.log('Successfully created admin user:', userRecord.uid);

    // Set custom claims for admin access
    await adminAuth.setCustomUserClaims(userRecord.uid, { 
      admin: true,
      role: 'admin'
    });

    // Add user to Firestore with admin role
    const userRef = db.collection('users').doc(userRecord.uid);
    await userRef.set({
      uid: userRecord.uid,
      email: adminEmail,
      role: 'admin',
      displayName: 'Admin User',
      createdAt: new Date().toISOString(),
      lastLogin: null
    }, { merge: true });

    console.log('Successfully set admin role and added to Firestore');
    console.log('Admin user setup complete!');
    console.log(`Email: ${adminEmail}`);
    console.log('You can now log in to the admin dashboard');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();