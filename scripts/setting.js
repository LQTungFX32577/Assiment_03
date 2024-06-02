'use strict'

if(getFromStorage("currentUser")){
    const pageSize = document.getElementById('input-page-size');
    const category = document.getElementById('input-category');
    const save = document.getElementById('btn-submit');

    currentUser = getFromStorage('currentUser');
    console.log(currentUser);
    save.addEventListener('click', function(){

        const isvalidate = validate(currentUser);
        if(isvalidate) {
            swal("Setting save!")
            console.log(pageSize.value);
            console.log(category.value);
            currentUser = new User (
                currentUser.fullName,
                currentUser.userName,
                currentUser.password,
                pageSize.value,
                category.value
                
            )
          saveToStorage('currentUser', currentUser);
          console.log(currentUser);
        }
    });
    function validate() {
        let isvalidate = true ; 
        if(pageSize.value.trim().length === 0) {
            alert('vui long nhap so trang!');
            isvalidate = false;
        }
        if(Number.isNaN(Number.parseInt(pageSize.value))) {
            alert('vui long dung dinh dang so!');
            isvalidate = false;
        }
        return isvalidate;
    }
} else {
    if(confirm('vui long dang nhap de su dung chuc nang nay')){
        window.location.assign("../index.html");
    }
}