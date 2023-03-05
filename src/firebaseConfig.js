// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY9He9XbO7pzQ-nAcskYB9CYk-yZ1EN0o",
  authDomain: "convergent-test.firebaseapp.com",
  projectId: "convergent-test",
  storageBucket: "convergent-test.appspot.com",
  messagingSenderId: "545802229360",
  appId: "1:545802229360:web:91180acf1964d249ebc6b5",
  measurementId: "G-50REV2L3WD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
