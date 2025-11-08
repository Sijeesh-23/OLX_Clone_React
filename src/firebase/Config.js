
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC9PiFPYd8UaIgkslQCOrPQvRfYGLEr88w",
  authDomain: "fir-4b8ac.firebaseapp.com",
  projectId: "fir-4b8ac",
  storageBucket: "fir-4b8ac.firebasestorage.app",
  messagingSenderId: "304684130459",
  appId: "1:304684130459:web:2a547bd24387bfcb46263e",
  measurementId: "G-8XXPEKZ1S3"
};

const firebase = initializeApp(firebaseConfig);
export default firebase;