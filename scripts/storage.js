'use strict'

//luu gia tri bang local storage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
//lay gia tri tu storage theo key tuong ung
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}



//kiem tra key va lay du lieu tu local storage
const users = getFromStorage('USER_ARRAY') ? getFromStorage('USER_ARRAY') : [];

//tra ve instance cua User  
let userArr = users.map((user) => parseUser(user));   

//lay du lieu current user
let currentUser = getFromStorage('currentUser')
? parseUser(getFromStorage('currentUser'))
: null;

let todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

let todoArr = todos.map((todo) => parseTask(todo));
//chuyen js object sang instance
function parseUser (data) {
   const user = new User (
   data.firstname,
   data.lastname,
   data.userName,
   data.password
); 
   return user; 
}

function parseTask(taskData) {
    const task = new Task(taskData.task, taskData.owner, taskData.isDone)
    return task;
}