import { db } from "./database.js";

class User{    

    constructor(){
        this.id = "ZkUfGJ1Ix1WXewz6fq2V";
    }

    //read
    async get(todoId){
        let snapshot = await db.collection("users").doc(this.id).collection("todos").doc(todoId).get();
        return snapshot.data();
    }
    
    //create
    post(todo){
        db.collection("users").doc(this.id).collection("todos").add({
            text: todo,
            done: false
        });
    }

    //update
    put(todo, done, todoId){
        db.collection("users").doc(this.id).collection("todos").doc(todoId).update({
            text: todo,
            done: done
        });
    }

    //delete
    delete(todoId){
        db.collection("users").doc(this.id).collection("todos").doc(todoId).delete();
    }
}


export let user = new User();

export let setId = (id) => {
    user.id = id;
};

