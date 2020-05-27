import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

const firebaseIns = firebase.initializeApp(firebaseConfig);

/*
  Used functions.
 */
const firestore = firebaseIns.firestore();
const auth = firebaseIns.auth();
const storage = firebaseIns.storage();
const firebaseFunctions = firebaseIns.functions();

export { firestore, firebaseFunctions, auth, storage };
