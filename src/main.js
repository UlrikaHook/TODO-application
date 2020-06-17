import "./style.css";
import { db } from "./database.js";
import { User } from "./User.js";

const container = document.querySelector("#todos");
const addButton = document.querySelector("#add-button");
const addForm = document.querySelector("#add-form");
const logoutButton = document.querySelector("#log-out");

/* Get id of current User stored in sessionStorage by login-page (index.js) */
let user = new User(sessionStorage.getItem("userId"));

/* Real time listener, triggers every time a change in collection todo of current user occurs
   Every change follows by function-call to change the HTML-DOM */
db.collection('users').doc(user.id).collection('todos').onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == "added"){
            renderTodo(change.doc);
        } else if (change.type == "removed"){
            removeTodo(change.doc);
        } else if (change.type == "modified"){
            updateTodo(change.doc);
        }
    });
});

/* Add eventlistener to the addButton on top of the page 
   Creates new document in database from new information in addForm */
addButton.addEventListener("click", ()=>{
    user.create(addForm.todo.value);
    addForm.todo.value = "";
});

/* Add eventlistener to logoutButton
   Remove current userId from sessionStorage */
logoutButton.addEventListener("click", ()=>{
    sessionStorage.removeItem("userId");
});

/* Adds new documents to DOM
   Adds eventlisteners to created buttons
 */
let renderTodo = (doc) => {

    /* -- Creates elements -- */

    let todoItem = document.createElement("div");
    todoItem.setAttribute("id", "A" + doc.id);
    todoItem.classList.add("todo-item");

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

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    let checkButton = document.createElement("button");
    checkButton.classList.add("icon-button");
    checkButton.classList.add("check-button");

    let checkImg = document.createElement("img");
    checkImg.setAttribute("title", "Check/Uncheck");
    if(doc.data().done){
        checkImg.setAttribute("src", "src/images/checked.png");
        checkButton.classList.add("checked");
        text.classList.add("done-item");
    } else {
        checkImg.setAttribute("src", "src/images/unchecked.png");
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

    /* -- Creates DOM-hierarchy -- */

    editForm.append(editInput, editButton);
    checkButton.appendChild(checkImg);
    penButton.appendChild(penImg);
    deleteButton.appendChild(deleteImg);

    buttonContainer.append(checkButton, penButton, deleteButton);

    todoItem.append(text, editForm, buttonContainer);

    /* -- Adds text to the todo -- */
    text.innerHTML = doc.data().text;

    /* -- Adds event listeners to the buttons -- */

    /* - EDIT BUTTON
       -- Sends the filled in value in edit form to db,
       -- using the user-object and its put-function */
    editButton.addEventListener("click", async()=>{
        let snapshotDoc = await user.read(doc.id);
        user.update(editForm.todo.value, snapshotDoc.done, doc.id); //Sends current "done" to db (nothing changes)
        editInput.value = "";
    });

    /* - CHECK BUTTON
       -- Toggles "done"-data and sends it to db
       -- Toggles the image that should represent the button */
    checkButton.addEventListener("click", async()=>{
        let snapshotDoc = await user.read(doc.id);
        let done = snapshotDoc.done ? false : true;
        user.update(snapshotDoc.text, done, doc.id); //Sends current text to db (nothing changes)
    });

    /* - PEN Button
       -- Toggles editForm to show / not show when clicked
       -- Toggles style on penButton */
    penButton.addEventListener("click", () => {
        editForm.classList.toggle("hidden-form");
        penButton.classList.toggle("checked");
    });

    /* - DELETE BUTTON
       -- Removes document from db */
    deleteButton.addEventListener("click", ()=>{
        user.delete(doc.id);
    });

    /* Puts all above in DOM */
    container.appendChild(todoItem);
}

/* Remove deleted documents from DOM */
let removeTodo = (doc) => {
    let element = document.querySelector("#A" + doc.id);
    container.removeChild(element);
}

/* Updates modified documents
   Put current text in document to p-tag
   Set checkButton image and style dependent of state of done-variable in database */
let updateTodo = (doc) => {
    let todoItem = document.querySelector("#A" + doc.id);
    let text = todoItem.querySelector("p");
    let button = todoItem.querySelector("div").querySelector("button");
    let img = button.querySelector("img");

    todoItem.querySelector("p").innerHTML = doc.data().text;
    button.classList.toggle("checked");
    text.classList.toggle("done-item");

    let done = doc.data().done;
    if(done){
        img.setAttribute("src", "src/images/checked.png");
    }else{
        img.setAttribute("src", "src/images/unchecked.png");
    }

}


