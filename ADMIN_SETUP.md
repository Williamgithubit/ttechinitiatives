# Admin User Management Setup

This document provides instructions for setting up and using the admin user management features in the T-Tech Initiatives application.

## Prerequisites

1. Firebase project with Authentication, Firestore, and Cloud Functions enabled
2. Node.js and npm installed
3. Firebase CLI installed (`npm install -g firebase-tools`)

## Setup Instructions

### 1. Configure Firebase

1. Create a new Firebase project or use an existing one
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Cloud Storage
   - Cloud Functions

### 2. Set Up Email Sending (Gmail)

1. Create a Gmail account for sending emails or use an existing one
2. Enable 2-Step Verification for the Gmail account
3. Generate an App Password:
   - Go to your Google Account settings
   - Navigate to Security > App passwords
   - Generate a new app password for the application
   - Note down the generated password

### 3. Configure Environment Variables

1. Navigate to the `functions` directory:
   ```bash
   cd functions
   ```
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Edit the `.env` file with your Gmail credentials and frontend URL

### 4. Deploy Cloud Functions

1. Log in to Firebase:
   ```bash
   firebase login
   ```
2. Set your Firebase project:
   ```bash
   firebase use your-project-id
   ```
3. Install dependencies:
   ```bash
   cd functions
   npm install
   ```
4. Deploy the functions:
   ```bash
   firebase deploy --only functions
   ```

### 5. Set Up Firestore Security Rules

1. Update the Firestore security rules in `firestore.rules`
2. Deploy the security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Using the Admin Dashboard

### Adding a New User

1. Log in as an administrator
2. Navigate to the Admin Dashboard
3. Click the "Add User" button
4. Fill in the user's details:
   - First Name
   - Last Name
   - Email Address
   - Role (Student, Teacher, Parent, or Administrator)
5. Click "Add User"

### Managing Users

- **View Users**: The user management table shows all registered users
- **Filter Users**: Use the search box and role filter to find specific users
- **Edit User**: Click the edit icon to modify a user's details
- **Reset Password**: Use the password reset feature to send a password reset email

## Troubleshooting

### Emails Not Sending

1. Verify that the Gmail account has "Less secure app access" enabled or use an App Password
2. Check the Firebase logs for any errors:
   ```bash
   firebase functions:log
   ```
3. Ensure the environment variables are set correctly in the Firebase project:
   ```bash
   firebase functions:config:set gmail.email=your-email@gmail.com gmail.password=your-app-password app.url=your-frontend-url
   ```

### User Creation Failing

1. Check the browser's console for any errors
2. Verify that the user doesn't already exist in Firebase Authentication
3. Ensure the admin has the necessary permissions in Firestore

## Security Considerations

1. Always use strong, unique passwords for admin accounts
2. Enable two-factor authentication for admin accounts
3. Regularly review user access and permissions
4. Keep the Firebase project's security rules up to date

## Support

For additional help, please contact the development team or refer to the Firebase documentation.
