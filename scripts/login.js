'use strict'
const loginUserName = document.getElementById('input-username');
const loginPassword = document.getElementById('input-password');
const login = document.getElementById('btn-submit');


//kiem tra du lieu user
userArr = getFromStorage("USER_ARRAY") ??'[]';

login.addEventListener('click', function() {
      validate();
    // if(isvalidate) {
        let result = false;
        for (let i = 0; i < userArr.length; i++) {
            if(loginUserName.value === userArr[i].userName && loginPassword.value === userArr[i].password){
                result = true;
                 //luu vao storage
                saveToStorage("currentUser", userArr[i]);
            }
        }
    if(result) {
        
       swal("Good job!", "đăng nhập thành công!", "success")
       //ve home
       setTimeout(() => {
          window.location.assign ('../index.html')
          }, 1500);
    
       
    } else {
        setTimeout(() => {
            sweetAlert("Oops...", "đăng nhập thất bại, vui lòng thử lại!", "error");
            }, 1500);
    }   
    // }
});

function validate() {
    let isvalidate = true ; 
    if(loginUserName.value.trim().length === 0) {
        swal({
            title: "Warning!",
            text: "vui lòng nhập username!",
            timer: 1000
          });
        isvalidate = false;
    }
    if(loginPassword.value === "") {
        swal({
            title: "Warning!",
            text: "vui lòng nhập password!",
            timer: 1000
          });
        isvalidate = false;
    }
    return isvalidate;
}