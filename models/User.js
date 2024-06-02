'use strict'


//tao class user
class User {
    constructor(fullName, userName, password,
        pageSize, category) {
        this.fullName = fullName;
        this.userName = userName;
        this.password = password;
        this.pageSize = pageSize;
        this.category = category;

    }
}
//class task
class Task {
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}

