'use strict';

if(getFromStorage("currentUser")){
    const searchInput = document.getElementById('input-query');
    const searchBtn  = document.getElementById('btn-submit');
    const container  = document.getElementById('news-container');
    const nav = document.getElementById('nav-page-num');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pageNum = document.getElementById('page-num');

    
    let totalResults = 0;
    let page = 1;
    let acces = 0;
    currentUser = getFromStorage('currentUser');
    
    //bat su kiem tim kiem
    searchBtn.addEventListener('click', function(){
        acces = 1;
        page = 1;
        let isvalidate = validate();
        if(isvalidate){
        loading();
        setTimeout(() => {
            getDataSearch(searchInput.value, page);
            pageNum.textContent = 1;
        }, 200);
        }
    });
    function loading() {
        container.innerHTML = `<div class = "loader"></div>`
    }
    console.log(searchInput.value);
    function validate() {
        let isvalidate = true ; 
        if(searchInput.value.trim().length <= 8) {
            alert('vui long nhap du 8 tu khoa de tim kiem!');
            isvalidate = false;
        }
        return isvalidate;
    }
    async function getDataSearch(key, page) {
        try {
        const res = await fetch(`
        https://newsapi.org/v2/everything?q=${key}&page=${page}\&pageSize=5&apiKey=cc8771c1a8054780a04b31105884a0db`);
        const data = await res.json();
        console.log(data);
        totalResults = data.totalResults;
        console.log(totalResults);
        if(data.status ==="error" && data.code ==="rateLimited") {
            throw new Error(data.messenger);
        }   

        //khong co bai viet
        if(data.totalResults == 0) {
          nav.style.display = 'none';
          throw new Error('not found the blog!');
        }
        //loi chay tap tin khong qua server
        if(data.code ==="corsNotAllowed") {
            throw new Error(data.messenger);
        }

        //hien thi list news
        displayNews(data);
        
    } 
    //bat loi
    catch (err) {
        alert('Error:' + err.messenger);
    }
 }
    function checkPrev() {
        //an khi dang o trang dau
        if(pageNum.textContent <= 1) {
            btnPrev.style.display = "none";
        }else {
            btnPrev.style.display = "block"; 
        }
    } 
    
    function checknext() {
        //an khi dang o trang cuoi
        if(pageNum.textContent >= Math.ceil(totalResults / currentUser.pageSize)) {
            btnNext.style.display = "none";
        }else {
            btnNext.style.display = "block"; 
        }
    }  
    btnPrev.addEventListener('click', function(){
        //chuyen sang trang truoc do
       
        getDataSearch(searchInput.value, --page);
        --pageNum.textContent; 
        
    });
    btnNext.addEventListener('click', function(){
        //chuyen sang trang truoc do
       
        getDataSearch(searchInput.value, ++page);
        ++pageNum.textContent;
    });

    //ham hien thi news list
    function displayNews(data) {
        //goi ham kiem tra prev va next
        
        
    let html = "";
        //hien thi tren trang
        data.articles.forEach(function (articles) {
            html += `
            <div class = "new-content">
                <div class = "img-banner">
                <img src ="${articles.urlToImage} ? ${articles.urlToImage} : no_image.jpg" alt="img"/>
                </div>

                <div class = "content">
                <h4>${articles.title}</h4>
                <p>${articles.description}</p>
                <a href ="${articles.url}" target ="_blank" class="btn btn-primary">View</a>
                </div>
            </div>
           `;
        });
        container.innerHTML = html; 
        checkPrev();
        checknext();
    }

} else {
    if(confirm('vui long dang nhap hoac dang ky de truy cap')){
        window.location.assign("../index.html");
    }else {
        container.style.display ="block";
    };
}

