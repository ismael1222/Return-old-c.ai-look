// ==UserScript==
// @name         Old c.ai
// @namespace    https://github.com/ismael1222/Return-old-c.ai-look
// @version      0.1.2
// @description  Reskind the new site into good ol' looks with this script
// @author       u/MaxGremory
// @grant        GM_getResourceText
// @match        https://character.ai/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @resource htmll https://return-old-c-ai-look.vercel.app/mainpage.html
// ==/UserScript==

(function() {
    'use strict';
    function createCard(charName, imageURL, charURL , element){
        //create card template, grab wich "cards rail" will this
        //be put on (1st, 2nd or 3rd being 0 1 and 2) and then
        //use insertAdjacentHTML to put it at the end
        let card = `<a href="${charURL}"><div class="card"><img src="${imageURL}" alt="${charName}"><strong><p>${charName}</p></strong></div></a>`
        let container = document.querySelectorAll('.cardContainer')[element]
        container.insertAdjacentHTML('beforeend', card)
    }
    function pastePage(){
        let x = GM_getResourceText("htmll");
        document.querySelector('body').insertAdjacentHTML('beforeend', x);
    }
    function inicializacion(){
        // Get profile picture
        document.querySelector("img.profilePic").src = document.querySelectorAll('.object-cover.object-top')[1].src.split("i/80/").join("i/200/")
        //-------
        //Continue Chatting section
        document.querySelectorAll("a.gap-2.group").forEach(character =>{
            let name = character.querySelector("p.text-md").innerHTML
            let imageSelector = character.querySelector(".relative.mb-2 img")
            let imageURL = "#"
            imageSelector?imageURL = imageSelector.src.split("i/80/").join("i/200/"):"#"
            let charURL = character.href
            createCard(name, imageURL, charURL, 0)
        })

        console.log("finished CC")
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

    }
    pastePage();
    var interval = setInterval(start, 100)
    function start(){
        console.log('starting')
        let test = document.querySelectorAll(".relative.mb-2 p.text-md")[0]
        if(test !== undefined){
            clearInterval(interval);
            inicializacion()
        }

    }
})();
