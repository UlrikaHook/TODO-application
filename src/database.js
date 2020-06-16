
  
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";
import { firebaseConfig } from "./firebase.js";
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Kopplar till databasen
export const db = firebase.firestore();









