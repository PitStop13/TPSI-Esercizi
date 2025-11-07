"use strict"

const DIM = 3;
let turnoUtente = true;
let giocoFinito = false;

window.onload = function() {
    let body = document.getElementsByTagName("body")[0];
    
    // Div info
    let divInfo = document.createElement("div");
    divInfo.id = "info";
    divInfo.innerText = "Tocca a te! (X)";
    body.appendChild(divInfo);
    
    // Creazione tabella
    let table = document.createElement("table");
    body.appendChild(table);
    table.style.margin = "0 auto";
    
    for(let i = 0; i < DIM; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);
        
        for(let j = 0; j < DIM; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            
            let btn = document.createElement("button");
            td.appendChild(btn);
            btn.id = "btn-" + i + "-" + j;
            btn.addEventListener("click", cliccaUtente);
        }
    }
    
    // Bottone reset
    let btnReset = document.createElement("button");
    btnReset.id = "btnReset";
    btnReset.innerText = "Nuova Partita";
    btnReset.addEventListener("click", reset);
    body.appendChild(btnReset);
}

function cliccaUtente() {
    if(this.innerText == "" && turnoUtente && !giocoFinito) {
        this.innerText = "X";
        this.style.color = "#3498db";
        this.disabled = true;
        
        if(controllaVittoria("X")) {
            document.getElementById("info").innerText = "HAI VINTO! 🎉";
            document.getElementById("info").style.color = "#2ecc71";
            giocoFinito = true;
            bloccaTutto();
            return;
        }
        
        if(controllaPatta()) {
            document.getElementById("info").innerText = "PAREGGIO! 🤝";
            document.getElementById("info").style.color = "#f39c12";
            giocoFinito = true;
            return;
        }
        
        turnoUtente = false;
        document.getElementById("info").innerText = "Computer sta pensando...";
        setTimeout(turnoComputer, 500);
    }
}

function turnoComputer() {
    if(giocoFinito) return;
    
    let celle = [];
    
    // Trova celle vuote
    for(let i = 0; i < DIM; i++) {
        for(let j = 0; j < DIM; j++) {
            let btn = document.getElementById("btn-" + i + "-" + j);
            if(btn.innerText == "") {
                celle.push(btn);
            }
        }
    }
    
    if(celle.length > 0) {
        // Scelta casuale
        let scelta = celle[Math.floor(Math.random() * celle.length)];
        scelta.innerText = "O";
        scelta.style.color = "#e74c3c";
        scelta.disabled = true;
        
        if(controllaVittoria("O")) {
            document.getElementById("info").innerText = "HA VINTO IL COMPUTER! 🤖";
            document.getElementById("info").style.color = "#e74c3c";
            giocoFinito = true;
            bloccaTutto();
            return;
        }
        
        if(controllaPatta()) {
            document.getElementById("info").innerText = "PAREGGIO! 🤝";
            document.getElementById("info").style.color = "#f39c12";
            giocoFinito = true;
            return;
        }
        
        turnoUtente = true;
        document.getElementById("info").innerText = "Tocca a te! (X)";
    }
}

function controllaVittoria(simbolo) {
    // Controllo righe
    for(let i = 0; i < DIM; i++) {
        let conta = 0;
        for(let j = 0; j < DIM; j++) {
            let btn = document.getElementById("btn-" + i + "-" + j);
            if(btn.innerText == simbolo) conta++;
        }
        if(conta == 3) return true;
    }
    
    // Controllo colonne
    for(let j = 0; j < DIM; j++) {
        let conta = 0;
        for(let i = 0; i < DIM; i++) {
            let btn = document.getElementById("btn-" + i + "-" + j);
            if(btn.innerText == simbolo) conta++;
        }
        if(conta == 3) return true;
    }
    
    // Controllo diagonale principale (\)
    let contaDiag1 = 0;
    for(let i = 0; i < DIM; i++) {
        let btn = document.getElementById("btn-" + i + "-" + i);
        if(btn.innerText == simbolo) contaDiag1++;
    }
    if(contaDiag1 == 3) return true;
    
    // Controllo diagonale secondaria (/)
    let contaDiag2 = 0;
    for(let i = 0; i < DIM; i++) {
        let btn = document.getElementById("btn-" + i + "-" + (DIM-1-i));
        if(btn.innerText == simbolo) contaDiag2++;
    }
    if(contaDiag2 == 3) return true;
    
    return false;
}

function controllaPatta() {
    for(let i = 0; i < DIM; i++) {
        for(let j = 0; j < DIM; j++) {
            let btn = document.getElementById("btn-" + i + "-" + j);
            if(btn.innerText == "") return false;
        }
    }
    return true;
}

function bloccaTutto() {
    for(let i = 0; i < DIM; i++) {
        for(let j = 0; j < DIM; j++) {
            let btn = document.getElementById("btn-" + i + "-" + j);
            btn.disabled = true;
        }
    }
}

function reset() {
    giocoFinito = false;
    turnoUtente = true;
    document.getElementById("info").innerText = "Tocca a te! (X)";
    document.getElementById("info").style.color = "white";
    
    for(let i = 0; i < DIM; i++) {
        for(let j = 0; j < DIM; j++) {
            let btn = document.getElementById("btn-" + i + "-" + j);
            btn.innerText = "";
            btn.disabled = false;
            btn.style.color = "black";
        }
    }
}
