import "./style.css";
import { db } from "./database.js";

//export const run = async () => {


    import { user } from "./User.js";
    //import { v4 as uuid } from 'uuid';

    const container = document.querySelector("#todos");
    const addButton = document.querySelector("#add-button");
    const addForm = document.querySelector("#add-form");

    /*export const getUser = async()=>{
        let module = await import("./User.js");
        user = module.user.id;
    }*/

    console.log("hrj");

    db.collection('users').doc("ZkUfGJ1Ix1WXewz6fq2V").collection('todos').onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == "added"){
                console.log("I added");
                renderTodo(change.doc);
            } else if (change.type == "removed"){
                removeTodo(change.doc);
                console.log("I removed");
            } else if (change.type == "modified"){
                updateTodo(change.doc);
                console.log("I updated");
            }
        });
    });



    //Redigera DOM-metoder

    let renderTodo = (doc) => {

        // Creates all the elements within a todo,
        // and sets all classes and attributes to it

        let todoWrapper = document.createElement("div");
        todoWrapper.setAttribute("id", "A" + doc.id);
        todoWrapper.classList.add("todo-item");

        let text = document.createElement("p");

        let editForm = document.createElement("form");
        editForm.classList.add("hidden-form");

        let editInput = document.createElement("input");
        editInput.setAttribute("type", "text");
        editInput.setAttribute("name", "todo");

        let editButton = document.createElement("input")
        editButton.setAttribute("type", "button");
        editButton.setAttribute("value", "Edit");
        editButton.classList.add("text-button");

        let buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("button-container");

        let checkButton = document.createElement("button");
        checkButton.classList.add("icon-button");
        checkButton.classList.add("check-button");

        let checkImg = document.createElement("img");
        checkImg.setAttribute("title", "Check/Uncheck");
        if(doc.data().done){
            checkImg.setAttribute("src", "src/images/checked.png");
            checkButton.classList.add("checked");
        } else {
            checkImg.setAttribute("src", "src/images/unchecked.png");
            checkButton.classList.remove("checked");
        }
        

        let penButton = document.createElement("button");
        penButton.classList.add("icon-button");

        let penImg = document.createElement("img");
        penImg.setAttribute("src", "src/images/edit.png");
        penImg.setAttribute("title", "Edit");

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("icon-button");

        let deleteImg = document.createElement("img");
        deleteImg.setAttribute("src", "src/images/delete.png");
        deleteImg.setAttribute("title", "Delete");

        //Creates DOM-hierarchy

        editForm.append(editInput, editButton);
        checkButton.appendChild(checkImg);
        penButton.appendChild(penImg);
        deleteButton.appendChild(deleteImg);

        buttonWrapper.append(checkButton, penButton, deleteButton);

        todoWrapper.append(text, editForm, buttonWrapper);

        //Adds text to the todo
        text.innerHTML = doc.data().text;

        //Add event listeners to the buttons

        // - EDIT BUTTON
        // -- Sends the filled in value in edit form to db,
        // -- using the user-object and its put-function
        editButton.addEventListener("click", async()=>{
            let snapshotDoc = await user.get(doc.id);
            user.put(editForm.todo.value, snapshotDoc.done, doc.id); //Sends current done to db (nothing changes)
            editInput.value = ""; //Reset form textfield
        });

        // - CHECK BUTTON
        // -- Toggles "done"-data and sends it to db
        // -- Toggles the image that should represent the button

        checkButton.addEventListener("click", async()=>{
            let snapshotDoc = await user.get(doc.id);
            let done = snapshotDoc.done ? false : true;
            user.put(snapshotDoc.text, done, doc.id); //Sends current text to db (nothing changes)
        });

        // - PEN Button
        // -- Toggles Edit form to show / not show when clicked
        penButton.addEventListener("click", () => {
            editForm.classList.toggle("hidden-form");
            penButton.classList.toggle("checked");
        });

        // - DELETE BUTTON
        // -- Removes document from db
        deleteButton.addEventListener("click", ()=>{
            user.delete(doc.id);
        });

        //Puts it in DOM
        container.appendChild(todoWrapper);

    }

    let removeTodo = (doc) => {
        let element = document.querySelector("#A" + doc.id);
        container.removeChild(element);
    }

    let updateTodo = (doc) => {
        let element = document.querySelector("#A" + doc.id);
        let button = element.querySelector("div").querySelector("button");
        let img = button.querySelector("img");
        element.querySelector("p").innerHTML = doc.data().text;

        let done = doc.data().done;

        if(done){
            img.setAttribute("src", "src/images/checked.png");
            button.classList.add("checked");
        }else{
            img.setAttribute("src", "src/images/unchecked.png");
            button.classList.remove("checked");
        }

    }

    //Event listeners

    //1.
    addButton.addEventListener("click", ()=>{
        user.post(addForm.todo.value);
        addForm.todo.value = "";
    });
//}


  // --- Todo-fil ---
  //Add/update/delete-DOM-metoder
  //Eventlistener för:
  // 1. Add-knapp. Anropar CRUD-metod via user att lägga till i firestore
  // 2. Edit-knapp. Anropar CRUD-metod via user att uppdateare i firestore
  // 3. Check/uncheck-knapp. Anropar CRUD-metod via user att uppdateare i firestore
  // 4. Penna-knapp. Togglar Edit-fält
  // 5. Delete-knapp. Anropar CRUD-metod via user att remove i firestore