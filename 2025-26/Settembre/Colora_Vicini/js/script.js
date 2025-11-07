const DIM = 4;
let cont = 0;
let timerID;

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
            btn.setAttribute("id", "btn-" + i + "-" + j);
        }
    }
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    let btnPlay = document.createElement("button");
    btnPlay.id = "btnPlay";
    btnPlay.innerText = "Gioca";
    btnPlay.addEventListener("click", gioca);
    wrapper.appendChild(btnPlay);
    body.appendChild(wrapper);
}

function gioca(){
    let btnGioca = document.getElementById("btnPlay");
    btnGioca.disabled = true;
    timerID = setInterval(cambiaNum,50);
}

function cambiaNum(){
    let cells = document.getElementsByClassName("btnStyle");
    cells[Math.floor(cells.length * Math.random())].innerText = casuale();
    cont++;
    if ( cont == 100 )
    {
        cont = 0;
        clearInterval(timerID);
        check();
    }
}

function check(){
    let cells = document.getElementsByClassName("btnStyle");
    for(let z = 0; z < cells.length; z++)
    {
        let i = parseInt(cells[z].id.split('-')[1]);
        let j = parseInt(cells[z].id.split('-')[2]);

        if(i != DIM-1)
        {
            let btnLeft = document.getElementById(`btn-${i+1}-${j}`);
            if(btnLeft.innerText == cells[z].innerText && cells[z].innerText != "")
            {
                cells[z].classList.add("done");
            }
        }

        if(i != 0)
        {
            let btnRight = document.getElementById(`btn-${i-1}-${j}`);
            if(btnRight.innerText == cells[z].innerText && cells[z].innerText != "")
            {
                cells[z].classList.add("done");
            }
        }

        if(j != DIM-1)
        {
            let btnDown = document.getElementById(`btn-${i}-${j+1}`);
            if(btnDown.innerText == cells[z].innerText && cells[z].innerText != "")
            {
                cells[z].classList.add("done");
            }
        }

        if(j != 0)
        {
            let btnUp = document.getElementById(`btn-${i}-${j-1}`);
            if(btnUp.innerText == cells[z].innerText && cells[z].innerText != "")
            {
                cells[z].classList.add("done");
            }
        }
    }
    let done = document.getElementsByClassName("done");
    for(let z = 0; z < done.length; z++)
    {
        done[z].classList.remove("btnStyle");
    }
    let btnGioca = document.getElementById("btnPlay");
    btnGioca.disabled = false;
    checkWin();
}

function checkWin(){
    let cells = document.getElementsByClassName("btnStyle");
    if(cells.length == 0)
    {
        alert("Hai vinto!");
        let btnGioca = document.getElementById("btnPlay");
        btnGioca.disabled = true;
    }
}

function casuale(){
    return Math.floor(4*Math.random());
}