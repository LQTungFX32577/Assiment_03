'use strict'
const messenger = document.getElementById('welcome-message');
const unloginScreen = document.getElementById('login-modal');
const loginScreen = document.getElementById('main-content');
const logout = document.getElementById('btn-logout');

if(getFromStorage("currentUser")){
    unloginScreen.style.display = 'none';
    currentUser = getFromStorage("currentUser");
    loginScreen.style.display = 'block';
    messenger.textContent= `Welcome ${currentUser.userName}`;
    }
logout.addEventListener('click', function(){
    swal({
        title: "bạn có muốn logout?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes",
        closeOnConfirm: false
      },
      function(){
        swal("Done!", "logout!.", "success");
        loginScreen.style.display = 'none';
        localStorage.removeItem("currentUser");
        unloginScreen.style.display = 'block';
      });
});

