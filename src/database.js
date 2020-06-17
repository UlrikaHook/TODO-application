
/* Creates connection to firebase, and exports it */
  
import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./firebase.js";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();









