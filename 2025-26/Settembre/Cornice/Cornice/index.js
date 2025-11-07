
let DIM=10;
let index = -1;

window.onload=function() {
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

function visualizza(){
    cancellaCornice();
    disegnaCornice();
    setTimeout(visualizza, 500);
}

function cancellaCornice(){
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let btn = document.getElementById("btn" + i + "," + j);
            btn.style.backgroundColor = "rgb(127, 127, 127)";
        }
    }
}

function disegnaCornice(){
    index++;
    if(index == 5)
    {
        index = 0;
    }
    for(let i = index; i < DIM-index; i++){
        const btn0 = document.getElementById(`btn${i},${index}`);
        const btn1 = document.getElementById(`btn${i},${DIM-1-index}`);
        const btn2 = document.getElementById(`btn${index},${i}`);
        const btn3 = document.getElementById(`btn${DIM-1-index},${i}`);

        btn0.style.backgroundColor = "red";
        btn1.style.backgroundColor = "red";
        btn2.style.backgroundColor = "red";
        btn3.style.backgroundColor = "red";
    }
}