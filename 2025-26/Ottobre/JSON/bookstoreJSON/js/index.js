"use strict";
let jsonDoc;
let pos;
window.onload = function () {
    //Controllo se ho inserito qualche libro in localstorage
    let json = localStorage.getItem("jsonLibri");
    if (json != null) {
        jsonDoc = JSON.parse(json);
        visualizza();
    }
}

function aggiungi() {
    window.location.href = "aggiungi.html";
}

function visualizza() {
    let tBody = document.getElementById("tabLibri");
    tBody.innerHTML = "";
    for (let i = 0; i < jsonDoc.length; i++) {
        let libro = jsonDoc[i];
        let tr = document.createElement("tr");
        tBody.appendChild(tr);
        for (let key in libro) {
            let td = document.createElement("td");
            td.innerText = libro[key];
            tr.appendChild(td);
        }
        let td = document.createElement("td");
        let btn = document.createElement("input");
        btn.type = "button";
        btn.value = "ELIMINA";
        btn.setAttribute("id", i);
        btn.addEventListener("click", function () {
            ELIMINA(btn.id);
        });
        td.appendChild(btn);
        tr.appendChild(td);
    }
    pos = 0;
    leggiRecord();

}

function ELIMINA(id) {
    jsonDoc.splice(id, 1);
    let json = JSON.stringify(jsonDoc);
    localStorage.setItem("jsonLibri", json);
    visualizza();
}


function primo() {
    pos = 0;
    leggiRecord();
}
function indietro() {
    if (pos > 0) {
        pos--;
        leggiRecord();
    }
}
function avanti() {
    if (pos < jsonDoc.length - 1) {
        pos++;
        leggiRecord();
    }
}
function ultimo() {
    pos = jsonDoc.length - 1;
    leggiRecord();
}

function leggiRecord() {
    //stampo i vari elementi in posizione pos
    let div = document.getElementById("contenuto");
    div.innerHTML = "";
    for (let key in jsonDoc[pos]) {
        div.innerHTML += key + ": " + jsonDoc[pos][key] + "<br>";
    }
}
    
function visualizzaJSON() {
    alert(JSON.stringify(jsonDoc));
    pos = 0;
    leggiRecord();  
}