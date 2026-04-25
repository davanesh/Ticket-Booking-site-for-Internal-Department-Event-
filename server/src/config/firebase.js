import admin from 'firebase-admin';

// Attempt to initialize firebase-admin
try {
  admin.initializeApp({
    projectId: 'ticket-booking-55c7c' // Using your Project ID for token verification
  });
  console.log('Firebase Admin initialized securely.');
} catch (error) {
  console.error('Firebase Admin initialization error', error.message);
}

export default admin;
