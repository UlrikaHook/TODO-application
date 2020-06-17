import { db } from "./database.js"; 
import { setId } from "./User.js";
import "./style.css";
import { getUser } from "./main.js"
;
const loginButton = document.querySelector("#login-button");
const loginForm = document.querySelector("#login-form");

loginButton.addEventListener("click", async ()=>{
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const snapshot = await db.collection("users").where("username", "==", username).where("password", "==", password).get();

    console.log(snapshot.docs.length);
    if(snapshot.docs.length === 0){
        console.log("login failed");
        //alert("Login failed, try again");
    } else {
        console.log(snapshot.docs[0].id);
        setId(snapshot.docs[0].id);
        getUser();
        window.location.replace("main.html");
        //loadMain();

        
    }

});

let loadMain = async () => {
    let module = await import('./main');
    module.run();
}


  // --- Login-fil ---
  // Eventlistener för login-knapp:
  // 1. Kolla om username och password finns i firestore
  // 2. Om true, skapa user-objekt med id, länka till todo-site, id som param.
  // 3. Om false, alert fel inloggningsuppgifter