import {initializeApp, getApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA9sEeoIR4ueTllxXsjS3phGKikVIIPI2w',
  authDomain: 'chatwithfirebase-6dc12.firebaseapp.com',
  projectId: 'chatwithfirebase-6dc12',
  storageBucket: 'chatwithfirebase-6dc12.appspot.com',
  messagingSenderId: '265409936991',
  appId: '1:265409936991:android:2b61fc82d3891e18ebe5ea',
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {db, auth};
