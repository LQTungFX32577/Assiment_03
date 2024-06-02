'use strict'

if(getFromStorage("currentUser")){
    const newsContain = document.getElementById('news-container');
    const btnPrev = document.getElementById('btn-prev');
    const pageNum = document.getElementById('page-num');
    const btnNext = document.getElementById('btn-next');
    // container.style.display ="none";
    //tinh so news toi da tra ve tu api
    let totalResults = 0;
    let page = 1;
    currentUser = getFromStorage('currentUser')
    getDataNews('us', page);
   
    
    //ham lay du lieu tu news tu api va hien thi ra trang web
    async function getDataNews(country, page) {
        try {
            //link api va lay du lieu
            const res = await fetch(`
            https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}\&pageSize=${currentUser.pageSize}&page=${page}&apiKey=cc8771c1a8054780a04b31105884a0db`);
            const data = await res.json();
            console.log(data);
            totalResults = data.totalResults;
            console.log(totalResults);
            //check loi request qua so lan/ngay
            if(data.status ==="error" && data.code ==="rateLimited") {
                throw new Error(data.messenger);
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
        getDataNews('us', --page);
        --pageNum.textContent; 
    });
    btnNext.addEventListener('click', function(){
        //chuyen sang trang truoc do
        getDataNews('us', ++page);
        ++pageNum.textContent; 
    });

    //ham hien thi news list
    function displayNews(data) {
        //goi ham kiem tra prev va next
        checkPrev();
        checknext();
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
        newsContain.innerHTML = html; 
    }
} else {
    if(confirm('vui long dang nhap hoac dang ky de truy cap')){
        window.location.assign("../index.html");
    }else {
        container.style.display ="block";
    };
}
