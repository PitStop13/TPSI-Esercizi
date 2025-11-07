"use strict"
let DIM = 10;
let v = new Array(DIM);
let random;

window.onload = function () {
    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");

    body.appendChild(table);

    for (let i = 0; i < DIM; i++) {
        v[i] = 9;
    }

    for (let i = 0; i < DIM; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 0; j < DIM; j++) {
            let td = document.createElement("td");
            td.style.padding = "2px";
            tr.appendChild(td);
            let btn = document.createElement("button");
            td.appendChild(btn);
            btn.id = i + "," + j;
            btn.style.width = "30px";
            btn.style.height = "30px";
            btn.addEventListener("click", changeColor);
        }
    }
    let btnGioca = document.createElement("button");
    btnGioca.id = "btnGioca";
    btnGioca.textContent = "Avvia gioco!";
    btnGioca.addEventListener("click", function () {
        btnGioca.disabled = true;
        random = setInterval(giraECrea, 500);
    })
    body.appendChild(btnGioca);
}

function giraECrea() {
    let numRnd;
    do {
        numRnd = Math.floor(Math.random() * DIM);
    } while (document.getElementById(v[numRnd] + "," + numRnd).style.backgroundColor == "blue")

    document.getElementById(v[numRnd] + "," + numRnd).style.backgroundColor = "red";

    v[numRnd]--;
    if (v[numRnd] == -1) {
        alert("Ha vinto la colonna " + (numRnd + 1).toString());
        clearInterval(random);
        random = null;
    }
}

function changeColor() {
    this.style.backgroundColor = "blue";
    this.disabled = true;
}