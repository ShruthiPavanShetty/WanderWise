// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wanderwise-7dcb4.firebaseapp.com",
  projectId: "wanderwise-7dcb4",
  storageBucket: "wanderwise-7dcb4.firebasestorage.app",
  messagingSenderId: "473432960916",
  appId: "1:473432960916:web:28cd2237a4826dab8e6981",
  measurementId: "G-BB6H9BQGKC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
//const analytics = getAnalytics(app);