// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPAtp3bnOYUqHerHkE40M9FZ3jGK0rFDo",
  authDomain: "helper-buddy-333df.firebaseapp.com",
  projectId: "helper-buddy-333df",
  storageBucket: "helper-buddy-333df.firebasestorage.appspot.com",
  messagingSenderId: "856211765487",
  appId: "1:856211765487:web:646f51b0c0c2811c84c31a",
  measurementId: "G-WS0MTSBSFD"
};

// Initialize Firebase
const app = getApps().length ==0 ? initializeApp(firebaseConfig) : getApp();
const auth= getAuth(app);
auth.useDeviceLanguage();

export {auth};