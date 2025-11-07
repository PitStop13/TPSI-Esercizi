"use strict"
let DIM = 10;
let mode;
let giu, su, dx, sx = false;
let tempo;
let cont=0;
window.onload = function () {
    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");

    body.appendChild(table);

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
            btn.style.backgroundColor = "gray";
            btn.disabled = true;
        }
    }

    creaMele();
    posPartenzaSerpente();


    document.addEventListener('keydown', function (event) {
        mode = event.key;
        console.log(mode);
        //Gestisco la logica dello spostamento cella nera 
        if (mode == "ArrowUp") {
            su = true;
            giu = false;
            sx = false;
            dx = false;

        }
        if (mode == "ArrowDown") {
            su = false;
            giu = true;
            sx = false;
            dx = false;

        }
        if (mode == "ArrowRight") {
            su = false;
            giu = false;
            sx = false;
            dx = true;

        }
        if (mode == "ArrowLeft") {
            su = false;
            giu = false;
            sx = true;
            dx = false;

        }
        tempo = setInterval(muovi, 500);

    })

}
function muovi() {
    let snake = recuperaSnake();
    //recupera id
    let i = snake.id.split(",")[0];
    let j = snake.id.split(",")[1];
    
    //non funziona il movimento e il recupero dello snake una volta in movimento
    if (su) {
        // Sopra
        if (i > 0) {
            let btnSopra = document.getElementById((i - 1) + "," + j);
            btnSopra.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnSopra.style.backgroundColor == "red"){
                cont++;
            }
            if(btnSopra.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
            
        }
        if(i==0){
            let btnSopra = document.getElementById((DIM - 1) + "," + j);
            btnSopra.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnSopra.style.backgroundColor == "red"){
                cont++;
            }
            if(btnSopra.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
        }
    }
    
    if (giu) {
       // Sotto
        if (i < DIM - 1) {
            let btnSotto = document.getElementById((i + 1) + "," + j);
            btnSotto.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnSotto.style.backgroundColor == "red"){
                cont++;
            }
            if(btnSotto.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
        }
        if(i==DIM-1){
            let btnSotto = document.getElementById((0) + "," + j);
            btnSotto.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnSotto.style.backgroundColor == "red"){
                cont++;
            }
            if(btnSotto.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
        }


    }
    if (dx) {
        // Destra
        if (j < DIM - 1) {
            let btnDx = document.getElementById(i + "," + (j + 1));
            btnDx.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnDx.style.backgroundColor == "red"){
                cont++;
            }
            if(btnDx.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
        }
        if(j==DIM-1){
            let btnDx = document.getElementById((DIM - 1) + "," + 0);
            btnDx.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnDx.style.backgroundColor == "red"){
                cont++;
            }
            if(btnDx.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
        }
    }
     if (sx) {
        // Sinistra
        if (j > 0) {
            let btnSx = document.getElementById(i + "," + (j - 1));
            btnSx.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnSx.style.backgroundColor == "red"){
                cont++;
            }
            if(btnSx.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
        }
        if(j==0){
            let btnSx = document.getElementById((DIM - 1) + "," + DIM-1);
            btnSx.style.backgroundColor = "black";
            snake.style.backgroundColor = "gray";
            if(btnSx.style.backgroundColor == "red"){
                cont++;
            }
            if(btnSx.style.backgroundColor == "blue"){
                alert("hai perso");
                clearInterval(tempo);
            }
            if(cont==2){
                alert("hai vinto!");
                clearInterval(tempo);
            }
        }
    }
}

function recuperaSnake() {
    let possibileSnake;

    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            possibileSnake = document.getElementById(i + "," + j);
            if (possibileSnake.style.backgroundColor == "black") {
                return possibileSnake;
            }

        }
    }



}

function creaMele() {
    let ref;
    for (let i = 1; i < 3; i++) {
        let x, y;
        do {
            x = Math.floor(DIM * Math.random());
            y = Math.floor(DIM * Math.random());
            ref = document.getElementById(x + "," + y);
        } while (ref.innerText != "");
        ref.style.backgroundColor = "red";


    }
    let ref1;
    for (let i = 1; i < 3; i++) {
        let x, y;
        do {
            x = Math.floor(DIM * Math.random());
            y = Math.floor(DIM * Math.random());
            ref1 = document.getElementById(x + "," + y);
        } while (ref1.innerText != "" & ref1 !="red");
        ref1.style.backgroundColor = "blue";


    }
}

function posPartenzaSerpente() {
    let partenza;
    let x, y;
    do {
        x = Math.floor(DIM * Math.random());
        y = Math.floor(DIM * Math.random());
        partenza = document.getElementById(x + "," + y);
    } while (partenza.innerText != "" && partenza.style.backgroundColor != "red" && partenza.style.backgroundColor != "blue");
    partenza.style.backgroundColor = "black";


}