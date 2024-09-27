// ==UserScript==
// @name         Old c.ai
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Reskind the new site into good ol' looks with this script
// @author       u/MaxGremory
// @grant        GM_getResourceText
// @match        https://character.ai/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @resource htmll https://return-old-c-ai-look.vercel.app/mainpage.html
// ==/UserScript==

(function() {
    'use strict';
    /*
----------------------------------------------
Names from main page foryou edition
li.mb-6 agarra las tres listas de charcters que hay en la primer pagina
luego el [0] hace que tome la primera (foryou)
1 seria featured
y 2 ni se toca
console.clear()
var k = []
document.querySelectorAll("li.mb-6")[0].querySelectorAll('p.text-ellipsis.text-md-medium').forEach(thing =>{
k.push(thing.innerHTML)
})
k
----------------------------------------------
Names from continue talking:
.relative.mb2 grabs the "lists of characters for a cetan period of time"
so, [0] is today, or whatever's the latest one, [1] is yesterday, or whatever's the second one, and so on
but we only want the names, we dont need mark them away depending of time like the web
recentCharacterNames = [];
document.querySelectorAll(".relative.mb-2 p.text-md").forEach(characterName =>{
  recentCharacterNames.push(characterName.innerHTML)
})
----------------------------------------------
Get profile pic URL
document.querySelectorAll('.object-cover.object-top')[1].src
actually:
mb, this one is for chat pics, that one was for the profile pic of the user itself
document.querySelectorAll('.relative.mb-2 img')
*/


    function createCard(charName, imageURL, charURL , element){
        let card = `<a href="${charURL}"><div class="card"><img src="${imageURL}" alt="${charName}"><strong><p>${charName}</p></strong></div></a>`
        let container = document.querySelectorAll('.cardContainer')[element]
        container.insertAdjacentHTML('beforeend', card)
        //.insertAdjacentHTML('beforeend', card)
    }
    function pastePage(){
        let x = GM_getResourceText("htmll");
        document.querySelector('body').insertAdjacentHTML('beforeend', x);
    }
    function inicializacion(){
        // PROFILE PAGE
        document.querySelector("img.profilePic").src = document.querySelectorAll('.object-cover.object-top')[1].src.split("i/80/").join("i/200/")
        //-------
        //CONTINUE CHATTING
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
        //FOYOU PAGE
        document.querySelectorAll("li.mb-6")[0].querySelectorAll("div.swiper-slide").forEach(character =>{
            let name = character.querySelector("div p").innerHTML
            let imageSelector = character.querySelector("div img")
            let imageURL = "#"
            imageSelector?imageURL = imageSelector.src:"#"
            let charURL = character.querySelector("a").href
            createCard(name, imageURL, charURL, 1)
        })
        //FEATURED
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
    // Your code here...
})();
