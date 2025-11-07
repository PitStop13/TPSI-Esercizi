const DIM = 10;
let timerID;
let mode;
let contRed = 2;

window.onload = function () {
    let body = document.getElementsByTagName("body")[0];

    //CREAZIONE TABELLA
    let table = document.createElement("table");
    body.appendChild(table);
    table.style.margin = "0 auto";

    //CREAZIONE DELLE RIGHE E COLONNE
    for (let i = 0; i < DIM; i++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);

        for (let j = 0; j < DIM; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);

            //CREAZIONE DEI PULSANTI
            let div = document.createElement("div");
            td.appendChild(div);
            div.setAttribute("class", "Style");
            div.setAttribute("id", "div-" + i + "-" + j);
        }
    }

    insertColors();

    document.addEventListener("keydown", function (event) {
        mode = event.key;
    });

    timerID = setInterval(move, 30);
}

function move() {
    let snakeCell = document.getElementsByClassName("snake")[0];
    let snakeX = snakeCell.id.split('-')[1];
    let snakeY = snakeCell.id.split('-')[2];
    let newCell;

    if (mode == "ArrowUp") {
        if (snakeX != "0") {
            newCell = document.getElementById(`div-${parseInt(snakeX) - 1}-${snakeY}`);
        } else {
            newCell = document.getElementById(`div-${DIM - 1}-${snakeY}`);
        }
    } else if (mode == "ArrowDown") {
        if (snakeX != `${DIM - 1}`) {
            newCell = document.getElementById(`div-${parseInt(snakeX) + 1}-${snakeY}`);
        } else {
            newCell = document.getElementById(`div-0-${snakeY}`);
        }
    } else if (mode == "ArrowLeft") {
        if (snakeY != "0") {
            newCell = document.getElementById(`div-${snakeX}-${parseInt(snakeY) - 1}`);
        } else {
            newCell = document.getElementById(`div-${snakeX}-${DIM - 1}`);
        }
    } else if (mode == "ArrowRight") {
        if (snakeY != `${DIM - 1}`) {
            newCell = document.getElementById(`div-${snakeX}-${parseInt(snakeY) + 1}`);
        } else {
            newCell = document.getElementById(`div-${snakeX}-0`);
        }
    }

    newCell.classList.add("snake");
    snakeCell.classList.remove("snake");

    if (newCell.classList.contains("red")) {
        newCell.classList.remove("red");
        contRed--;
        if (contRed == 0) {
            alert("Hai vinto!");
            clearInterval(timerID);
        }
    } else if (newCell.classList.contains("blue")) {
        newCell.classList.remove("blue");
        alert("Nooo, hai perso!");
        clearInterval(timerID);
    }
}

function insertColors() {
    for (let i = 0; i < contRed; i++) {
        let x, y, cell;
        do {
            x = casuale(DIM);
            y = casuale(DIM);
            cell = document.getElementById(`div-${x}-${y}`);
        } while (cell.classList.contains("red"));
        cell.classList.add("red");
    }

    for (let i = 0; i < 3; i++) {
        let x, y, cell;
        do {
            x = casuale(DIM);
            y = casuale(DIM);
            cell = document.getElementById(`div-${x}-${y}`);
        } while (cell.classList.contains("red") || cell.classList.contains("blue"));
        cell.classList.add("blue");
    }

    let n, m, snake;
    do {
        n = casuale(DIM);
        m = casuale(DIM);
        snake = document.getElementById(`div-${n}-${m}`);
    } while (snake.classList.contains("red") || snake.classList.contains("blue"));
    snake.classList.add("snake");
}

function casuale(max) {
    return Math.floor(max * Math.random());
}