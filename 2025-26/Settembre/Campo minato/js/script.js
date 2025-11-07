const DIM = 10;
let cont = 0;

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
            let btn = document.createElement("button");
            td.appendChild(btn);
            btn.setAttribute("class", "btnStyle");
            btn.addEventListener("click", btnClick);
            btn.setAttribute("id", "btn-" + i + "-" + j);
            btn.setAttribute("bomb", "false");
            btn.setAttribute("nearby", "0");

        }
    }

    piazzaBombe();
}

function piazzaBombe() {
    for (let i = 0; i < 10; i++) {
        let possibleBomb
        do {
            possibleBomb = document.getElementById(`btn-${casuale(10)}-${casuale(10)}`);
        } while (possibleBomb.bomb == "true");

        possibleBomb.bomb = "true";
        possibleBomb.classList.add("bomb");
    }

    let cells = document.getElementsByClassName("bomb");
    for (let z = 0; z < cells.length; z++) {
        let i = parseInt(cells[z].id.split('-')[1]);
        let j = parseInt(cells[z].id.split('-')[2]);

        if (i != DIM - 1) {
            let btnLeft = document.getElementById(`btn-${i + 1}-${j}`);
            if (btnLeft.bomb == "false");
            {
                btnLeft.setAttribute("nearby", parseInt(btnLeft.getAttribute("nearby")) + 1);
            }
            if (j != DIM - 1) {
                let btnDownLeft = document.getElementById(`btn-${i + 1}-${j + 1}`);
                if (btnDownLeft.bomb == "false");
                {
                    btnDownLeft.setAttribute("nearby", parseInt(btnDownLeft.getAttribute("nearby")) + 1);
                }
            }
            if (j != 0) {
                let btnUpLeft = document.getElementById(`btn-${i + 1}-${j - 1}`);
                if (btnUpLeft.bomb == "false");
                {
                    btnUpLeft.setAttribute("nearby", parseInt(btnUpLeft.getAttribute("nearby")) + 1);
                }
            }
        }

        if (i != 0) {
            let btnRight = document.getElementById(`btn-${i - 1}-${j}`);
            if (btnRight.bomb == "false");
            {
                btnRight.setAttribute("nearby", parseInt(btnRight.getAttribute("nearby")) + 1);
            }

            if (j != DIM - 1) {
                let btnDownRight = document.getElementById(`btn-${i - 1}-${j + 1}`);
                if (btnDownRight.bomb == "false");
                {
                    btnDownRight.setAttribute("nearby", parseInt(btnDownRight.getAttribute("nearby")) + 1);
                }
            }
            if (j != 0) {
                let btnUpRight = document.getElementById(`btn-${i - 1}-${j - 1}`);
                if (btnUpRight.bomb == "false");
                {
                    btnUpRight.setAttribute("nearby", parseInt(btnUpRight.getAttribute("nearby")) + 1);
                }
            }
        }

        if (j != DIM - 1) {
            let btnDown = document.getElementById(`btn-${i}-${j + 1}`);
            if (btnDown.bomb == "false");
            {
                btnDown.setAttribute("nearby", parseInt(btnDown.getAttribute("nearby")) + 1);
            }
        }

        if (j != 0) {
            let btnUp = document.getElementById(`btn-${i}-${j - 1}`);
            if (btnUp.bomb == "false");
            {
                btnUp.setAttribute("nearby", parseInt(btnUp.getAttribute("nearby")) + 1);
            }
        }
    }
}

function btnClick() {
    if (this.classList.contains("bomb")) {
        alert("Hai perso! :(");
        lostOrWon();
    } else {
        show(this);
    }
    if (cont == 90) {
        alert("Hai vinto! :)")
        lostOrWon();
    }
}

function lostOrWon() {
    let all = document.getElementsByClassName("btnStyle");
    for (let z = 0; z < all.length; z++) {
        all[z].disabled = true;
        all[z].removeEventListener("click", btnClick);
    }
    let bombs = document.getElementsByClassName("bomb");
    for (let z = 0; z < bombs.length; z++) {
        bombs[z].style.backgroundColor = "red";
    }
}

function uncover(id) {
    let posX = parseInt(id.split('-')[2]);
    let posY = parseInt(id.split('-')[1]);

    if (posX != DIM - 1) {
        let cellRight = document.getElementById(`btn-${posY}-${posX + 1}`);
        if (cellRight.getAttribute("bomb") == "false" && cellRight.disabled == false) {
            show(cellRight);
        }
    }

    if (posX != 0) {
        let cellLeft = document.getElementById(`btn-${posY}-${posX - 1}`);
        if (cellLeft.getAttribute("bomb") == "false" && cellLeft.disabled == false) {
            show(cellLeft);
        }
    }

    if (posY != DIM - 1) {
        let cellUp = document.getElementById(`btn-${posY + 1}-${posX}`);
        if (cellUp.getAttribute("bomb") == "false" && cellUp.disabled == false) {
            show(cellUp);
        }
    }

    if (posY != 0) {
        let cellDown = document.getElementById(`btn-${posY - 1}-${posX}`);
        if (cellDown.getAttribute("bomb") == "false" && cellDown.disabled == false) {
            show(cellDown);
        }
    }
}

function show(cell) {
    cont++;
    cell.removeEventListener("click", btnClick);
    cell.disabled = true;
    if (cell.getAttribute("nearby") == "0") {
        cell.classList.add("num");
        uncover(cell.id);
    } else {
        cell.classList.add(`num${cell.getAttribute("nearby")}`);
        cell.innerText = cell.getAttribute("nearby");
    }
}

function casuale(max) {
    return Math.floor(max * Math.random());
}