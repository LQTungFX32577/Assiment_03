'use strict'
//khai bao bien
const firstName = document.getElementById('input-firstname');
const lastName = document.getElementById('input-lastname');
const UserName = document.getElementById('input-username');
const password = document.getElementById('input-password');
const passConfirm = document.getElementById('input-password-confirm');
const register = document.getElementById('btn-submit');

userArr = getFromStorage("USER_ARRAY") ?? [];

//Lấy dữ liệu nhập vào từ form 
//bat su kien register
register.addEventListener('click', function(){
        const user = new User(
            firstName.value + lastName.value,
            UserName.value,
            password.value,
        );

        const isvalidate = validate(user);
        if(isvalidate) {
            userArr.push(user);
            saveToStorage("USER_ARRAY", userArr);
            swal({
                title: "Done!",
                text: "đăng ký thành công",
                imageUrl: "ok.jpg"
              });
              setTimeout(() => {
                window.location.href = '../pages/login.html';
                }, 1500);
        }

});

//tao mot function de valid form register
function validate(user) {
    let isValidated = true;

    //khong bo trong gia tri firstname
    if(firstName.value.trim().length === 0) {
        swal("không được để trống firstname!");
        isValidated = false;
    }
    //khong bo trong gia tri lastname
    if(lastName.value.trim().length === 0) {
        swal("không được để trống lastname!");
        isValidated = false;
    }
    //khong bo trong gia tri username
    if(UserName.value.trim().length === 0) {
        swal("không được để trống username!");
        isValidated = false;
    }
    //khong bo trong gia tri password, pass phai co 8 ky tu tro len
    if(password.value ===""){
        swal("không được để trống password!");
        isValidated = false;
    }
    //confirm password khong duoc de trong
    if(passConfirm.value ===""){
        swal("confirm password!");
        isValidated = false;
    }
    //kiem tra xem password confirm co dung khong
    if(password.value !== passConfirm.value) {
        swal("pass và confirm không trùng khớp!");
        isValidated = false;
    }
    //kiem tra xem password co du 8 ky tu khong
    if(password.value.length <= 8) {
        swal("pass phải có 8 ký tự trở lên!");
        isValidated = false;
    }
    //kiem tra user co trung nhau khong
    for (let i = 0; i < userArr.length; i++) {
        if(userArr[i].userName === user.userName) {
            swal("user đã tồn tại!");
          isValidated = false;
          break;
        }
    }
    return isValidated;
}
