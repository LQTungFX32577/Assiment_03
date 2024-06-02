'use strict'
if(getFromStorage("currentUser")){
const todoInput = document.getElementById('input-task');
const todoList = document.getElementById('todo-list');
const Add = document.getElementById('btn-add');
//lay gia tri tu storage
currentUser = getFromStorage('currentUser');
displayTodoList();
Add.addEventListener('click', function(){
    currentUser = getFromStorage('currentUser');
    todos = getFromStorage('todoArr');
    let isvalidate = isValidated();
    if(isvalidate) {
        const todos = new Task (
            todoInput.value,
            currentUser.userName,
            false,
        );
        todoArr.push(todos);
        console.log(todos);
        saveToStorage('todoArr', todoArr);
        displayTodoList();
        todoInput.value ="";
    }
});
function displayTodoList() {
    let html ="";

    const listArr = todoArr.filter((todos) => todos.owner === currentUser.userName);
    console.log(listArr);

    listArr.forEach(function (todos) {
        html += `
        <li class=${todos.isDone ? "checked" : ""} >${todos.task}
        <span class ="close">X</span></li>
        `;
    });
    todoList.innerHTML = html;

    ToggleTask();
    DeleteTask();
}
function isValidated() {
    let isvalidate = true;
    for (let i = 0; i < todoArr.length; i++) {
        if(todoArr[i].task === todoInput.value && currentUser.userName === todos[i].owner){
            alert('hoat dong da duoc tao truoc do');
            isvalidate = false;
          
    }
    if(todoInput.value.trim().length === 0) {
        alert('hay nhap du lieu truoc khi add!');
        isvalidate = false;
    }
};
return isvalidate;
}

function ToggleTask() {
    document.querySelectorAll("#todo-list li").forEach(function(list){
        list.addEventListener("click", function(e) {
            if(e.target !== list.children[0]) {
                list.classList.toggle("checked");
                const todos = todoArr.find(
                    (todosItem) => 
                    todosItem.owner === currentUser.userName &&
                    todosItem.task === list.textContent.slice(0, -1)
                );
                todos.isDone = list.classList.contains("checked") ? true : false;
                saveToStorage("todoArr", todoArr);
            }
        });
    });
}

function DeleteTask() {

    const deleteList = document.querySelectorAll("#todo-list .close");
    deleteList.forEach((del, index) => {
        del.addEventListener('click', function () {
            console.log(index);
            if(confirm('are you sure?')){
            del.parentNode.remove();
            todoArr.splice(index, 1);
            saveToStorage('todoArr', todoArr);
            displayTodoList();
        }
        
        });
    });
    
}

}
else {
    if(confirm('vui long dang nhap de su dung chuc nang nay')){
        window.location.assign("../index.html");
    }
}
