// ==UserScript==
// @name         Old c.ai
// @namespace    https://github.com/ismael1222/Return-old-c.ai-look
// @version      0.1.3
// @updateURL    https://return-old-c-ai-look.vercel.app/Old%20c.ai.user.js
// @description  Reskind the new site into good ol' looks with this script
// @author       u/MaxGremory
// @grant        GM_getResourceText
// @match        https://character.ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @resource htmll https://return-old-c-ai-look.vercel.app/mainpage.html
// ==/UserScript==

(function() {
    'use strict';
    var lastPage = ""
    function loadMainPage(){
        function createCard(charName, imageURL, charURL , element){
            let card = `<a href="${charURL}"><div class="card"><img src="${imageURL}" alt="${charName}"><strong><p>${charName}</p></strong></div></a>`
        let container = document.querySelectorAll('.cardContainer')[element]
        container.insertAdjacentHTML('beforeend', card)
        }
        function pastePage(){
            let css = "<link rel='stylesheet' href='https://return-old-c-ai-look.vercel.app/mainpage.css'>"
            document.querySelector("body").insertAdjacentHTML("beforeend", css)
            let x = GM_getResourceText("htmll");
            document.querySelector('body').insertAdjacentHTML('beforeend', x);
        }
        function inicializacion(){
            let origPic = document.querySelectorAll('.object-cover.object-top')[1]
            let pic = "#"
            origPic?pic = origPic.src.split("i/80/").join("i/200/"):false;
            document.querySelector("img.profilePic").src = pic
            //-------
            //Continue Chatting section
            document.querySelectorAll("a.gap-2.group").forEach(character =>{
                let name = character.querySelector("p.text-md").innerHTML
                let imageSelector = character.querySelector(".relative.mb-2 img")
                let imageURL = "#"
                imageSelector?imageURL = imageSelector.src.split("i/80/").join("i/200/"):false;
                let charURL = character.href
                createCard(name, imageURL, charURL, 0)
            })
            //--------------
            //Foryou section
            document.querySelectorAll("li.mb-6")[0].querySelectorAll("div.swiper-slide").forEach(character =>{
                let name = character.querySelector("div p").innerHTML
                let imageSelector = character.querySelector("div img")
                let imageURL = "#"
                imageSelector?imageURL = imageSelector.src:"#"
                let charURL = character.querySelector("a").href
                createCard(name, imageURL, charURL, 1)
            })
            //Featured section
            document.querySelectorAll("li.mb-6")[1].querySelectorAll("div.swiper-slide").forEach(character =>{
                let name = character.querySelector("div p").innerHTML
                let imageSelector = character.querySelector("div img")
                let imageURL = "#"
                imageSelector?imageURL = imageSelector.src:"#"
                let charURL = character.querySelector("a").href
                createCard(name, imageURL, charURL, 2)
            })
            //INICIALIZACION TERMINADA, CARDS PUESTAS:
            setTimeout(()=>{
                document.querySelector('div.mainDiv').classList.remove("hide")
                document.querySelector("div.loading").classList.add("hide")
            },50)
        }
        pastePage();
        function start(){
            let testSubject = document.querySelectorAll("li.mb-6")[2].querySelectorAll(".swiper-slide.pr-2")[0]
            if(testSubject !== undefined){
                clearInterval(testInterval)
                inicializacion()
            }else{
                console.log("Failed to find the third loaded column's first card")
            }
        }
        var testInterval = setInterval(start, 100)
        }
    function loadChatPage(){
        console.log(1)
        let chatnumber = " 💬"+document.querySelector(".flex.gap-3 > div > div.flex").innerHTML.split(" chats").join("")
        console.log(2)
        let nameObject = document.querySelector("p.font-semi-bold.line-clamp-1.text-ellipsis.break-anywhere.overflow-hidden.whitespace-normal")
        console.log(3)
        let charImageINCHAT = document.querySelector(".flex.gap-3 > a")
        console.log(4)
        nameObject.insertAdjacentHTML("beforeend", chatnumber)
        charImageINCHAT.insertAdjacentHTML("beforebegin", "<a href='/'>⮜</a>")

    }
    setInterval(()=>{
        if(lastPage !== window.location.href){
            if(/https\:\/\/character\.ai\/chat\/([a-z0-9]|\_)+/gi.test(window.location.href)){
                console.log("GOTTA LOAD CHATS")
                lastPage = window.location.href
                loadChatPage()
            }else if(/https\:\/\/character\.ai\/$/gi.test(window.location.href)){
                console.log("GOTTA LOAD MAIN")
                lastPage = window.location.href
                loadMainPage()
            }else{
                console.error("PAGE NOT RECOGNIZED. PLEASE REPORT THIS ISSUE ALONG WITH THE URL PROVIDED ON THIS MESSAGE.\n"+window.location.href)
                lastPage = window.location.href
            }
        }
    }, 1000)

})();
