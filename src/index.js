import { db } from "./database.js"; 
import "./style.css";

/* Adds eventlistener to loginButton
   Checks username and password in database
   Redirect to main page if login succeded
   Alerts "login failed" if login fails */

const loginButton = document.querySelector("#login-button");
const loginForm = document.querySelector("#login-form");

loginButton.addEventListener("click", async ()=>{
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const snapshot = await db.collection("users").where("username", "==", username).where("password", "==", password).get();

    if(snapshot.docs.length === 0){
        console.log("login failed");
        alert("login failed");
    } else {
        sessionStorage.setItem("userId", snapshot.docs[0].id);
        location.replace("main.html");
    }
});
