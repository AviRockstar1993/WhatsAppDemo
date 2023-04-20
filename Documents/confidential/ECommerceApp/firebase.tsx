// Import the functions you need from the SDKs you need
// import {firebase} from '@react-native-firebase/auth';
import {initializeApp} from 'firebase/app';

// Import the functions you need from the SDKs you need
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBIqsZDuI4RhA9P6tQ9uksTJWjUHFW-YW8',
  authDomain: 'mygroceryapp-67e5f.firebaseapp.com',
  projectId: 'mygroceryapp-67e5f',
  storageBucket: 'mygroceryapp-67e5f.appspot.com',
  messagingSenderId: '443920664080',
  appId: '1:443920664080:web:e4bb2e033d0e8213e5ac95',
  measurementId: 'G-2KEQ7B77VN',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// export const auth = firebase.auth();
// export {app, auth};
