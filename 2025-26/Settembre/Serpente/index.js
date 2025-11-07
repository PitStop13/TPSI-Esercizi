
let DIM = 10;
let indexI = 0;
let indexJ = 0;
let RtoL = true;
let even = true;
let horizontal = true;

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
            btn.setAttribute("id", "btn" + i + "," + j);
        }
    }

    visualizza();
}

function visualizza() {
    disegnaCornice();
    setTimeout(visualizza, 10);
}

// function cancellaCornice() {
//     for (let i = 0; i < DIM; i++) {
//         for (let j = 0; j < DIM; j++) {
//             let btn = document.getElementById("btn" + i + "," + j);
//             btn.style.backgroundColor = "rgb(127, 127, 127)";
//         }
//     }
// }

function disegnaCornice() {
    let btn1;
    if(horizontal)
    {
        btn1 = document.getElementById(`btn${indexI},${indexJ}`);
    }else{
        btn1 = document.getElementById(`btn${indexJ},${indexI}`);
    }
    
    if(even)
    {
        btn1.style.backgroundColor = "red";
    }else{
        btn1.style.backgroundColor = "rgb(127, 127, 127)";
    }
    
    if ((indexJ == 9 && RtoL) || (indexJ == 0 && !RtoL)) {
        indexI++;
        RtoL = !RtoL;
    } else if (RtoL) {
        indexJ++;
    } else {
        indexJ--;
    }

    if (indexJ == 0 && indexI == 10) {
        indexI = 0;
        indexJ = 0;
        even = !even;
        if(even)
        {
            horizontal = !horizontal;
        }
    }
}