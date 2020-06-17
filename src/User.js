import { db } from "./database.js";

export class User{    

    constructor(id){
        this.id = id;
    }

    create(todo){
        db.collection("users").doc(this.id).collection("todos").add({
            text: todo,
            done: false
        });
    }

    async read(todoId){
        let snapshot = await db.collection("users").doc(this.id).collection("todos").doc(todoId).get();
        return snapshot.data();
    }

    update(todo, done, todoId){
        db.collection("users").doc(this.id).collection("todos").doc(todoId).update({
            text: todo,
            done: done
        });
    }

    delete(todoId){
        db.collection("users").doc(this.id).collection("todos").doc(todoId).delete();
    }
}
