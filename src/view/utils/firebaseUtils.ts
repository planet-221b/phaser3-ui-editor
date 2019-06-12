import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

enum FIREBASE_DB_CONFIG {
  API_KEY = 'AIzaSyAHJcpqoKAVpQE5Zq8SGmwI5Z_ppnLLBrs',
  AUTH_DOMAIN = 'phaser3.ui.editor.firebaseapp.com',
  PROJECT_ID = 'phaser3-ui-editor',
}
export function initializeFirebaseApp(): void {
  firebase.initializeApp({
    apiKey: FIREBASE_DB_CONFIG.API_KEY,
    authDomain: FIREBASE_DB_CONFIG.AUTH_DOMAIN,
    projectId: FIREBASE_DB_CONFIG.PROJECT_ID,
  });
  console.warn(firebase.firestore());
}

export async function authenticate(
  email: string,
  password: string,
): Promise<void> {
  const auth: firebase.auth.Auth = firebase.auth();
  auth.signInWithEmailAndPassword(email, password);
}
