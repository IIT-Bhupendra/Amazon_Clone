// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.React_App_API_CONFIG_KEY,
  authDomain: "challenge-30449.firebaseapp.com",
  projectId: "challenge-30449",
  storageBucket: "challenge-30449.appspot.com",
  messagingSenderId: "866757641126",
  appId: "1:866757641126:web:317c9a670baadf2a450567",
  measurementId: "G-FW8W6LF73V",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
