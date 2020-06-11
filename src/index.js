  // Firebase App (the core Firebase SDK) is always required and must be listed first
  import * as firebase from "firebase/app";

  // Add the Firebase products that you want to use
  import "firebase/firestore";
 
  

  const firebaseConfig = {
    apiKey: "AIzaSyA3awhY038UzNUK_SL6KybCRmHAIsZPpeM",
    authDomain: "todo-application-c4ca5.firebaseapp.com",
    databaseURL: "https://todo-application-c4ca5.firebaseio.com",
    projectId: "todo-application-c4ca5",
    storageBucket: "todo-application-c4ca5.appspot.com",
    messagingSenderId: "167021163406",
    appId: "1:167021163406:web:9b8c8b7b2dfad77433eadf"
  };

   // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

