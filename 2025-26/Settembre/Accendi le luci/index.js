"use strict"

const GIALLO = "rgb(255, 255, 0)"
const GRIGIO = "rgb(160, 160, 160)"

// Dimensione del campo di gioco
let DIM = 3;

// Numero si mosse effettuate
let mosse = 0;

window.addEventListener("load", function () {
    // Recupero il riferiemnto alla select
    const select = document.getElementsByTagName("select")[0];

    // Aggiungo le option delle dimensioni alla select
    caricaListDim();

    // Aggiungo l'evento sul cambiamento dell'elemnto selezionato
    select.addEventListener("change", selectionChanged);

    // Prono l'indice della option selezionato a -1, così forzo la select a deselezzionarla
    select.selectedIndex = -1;
});

function caricaListDim() {
    // Recupero il riferiemnto alla select
    const select = document.getElementsByTagName("select")[0];

    // Creo le 3 option della select e le appendo
    // 3 x 3, 4 x 4, 5 x 5, 6 x 6
    for (let i = 3; i <= 6; i++) {
        let option = document.createElement("option");
        option.value = `${i}`;
        option.innerText = `${i} x ${i}`;
        select.appendChild(option);
    }
}


function selectionChanged() {
    // Rendo il messaggio di vincita invisibile
    document.getElementById("vittoria").style.display = "none";

    // Recupero il riferimento al div wrapper
    const wrapper = document.getElementById("wrapper");

    // Pulisco il wrapper
    wrapper.innerHTML = "";

    // Ricavo la dimensione della scelta che ha scatenato l'evento
    DIM = parseInt(this.value);

    // Setto le dimensioni del wrapper in base alla dimensione della scelta che ha scatenato l'evento
    wrapper.style.width = `${(DIM * 50) + ((DIM - 1) * 2)}px`;
    wrapper.style.height = `${(DIM * 50) + ((DIM - 1) * 2)}px`;

    // Creo due for annidati che creano i div del wrapper e li apendono
    for (let i = 0; i < DIM; i++) {
        // Creo la riga
        let divRow = document.createElement("div");
        // Aggiugno il display flex row al div della riga
        divRow.style.display = "flex";

        for (let j = 0; j < DIM; j++) {
            // Creo la cella della riga
            let divCell = document.createElement("div");
            // Assegno l'id alla cella
            divCell.id = `cella-${i}-${j}`;
            // Setto le dimensioni della cella
            divCell.style.width = "50px";
            divCell.style.height = "50px";
            // Setto il colore di sfondo della cella
            divCell.style.backgroundColor = GRIGIO;

            // Aggiungo il margin a destra a tutte le celle tranne all'ultima
            if (j != DIM - 1) {
                divCell.style.marginRight = "2px";
            }

            // Aggiungo l'evento sul click del div
            divCell.addEventListener("click", cellClcik);
            divRow.appendChild(divCell);
        }

        // Aggiungo il margin in basso a tutte le celle tranne all'ultima
        if (divRow != DIM - 1) {
            divRow.style.marginBottom = "2px";
        }
        wrapper.appendChild(divRow);
    }
}

function cellClcik() {
    // Recupero la posizione della cella che ha scatenato l'evento tramite l'id
    let posCell = this.id.split("-");
    let iRowCell = parseInt(posCell[1]);
    let iColumnCell = parseInt(posCell[2]);

    // Mi chiedo qual'è il colore di sfondo della cella che scatenato l'evento
    if (this.style.backgroundColor == GRIGIO)
        // Il colore di sfondo diventa GIALLO
        this.style.backgroundColor = GIALLO;
    else
        // Il colore di sfondo diventa GRIGIO
        this.style.backgroundColor = GRIGIO;

    // Mi chiedo se la cella che si dovrebbe trovare al di spora di quella che ha scatenato l'evento esiste
    if ((iRowCell - 1) >= 0) {
        toggleCell(iRowCell - 1, iColumnCell);
    }

    // Mi chiedo se la cella che si dovrebbe trovare al di sotto di quella che ha scatenato l'evento esiste
    if ((iRowCell + 1) < DIM) {

        toggleCell(iRowCell + 1, iColumnCell);
    }

    // Mi chiedo se la cella che si dovrebbe trovare a sinistra di quella che ha scatenato l'evento esiste
    if ((iColumnCell - 1) >= 0) {
        toggleCell(iRowCell, iColumnCell - 1);
    }

    // Mi chiedo se la cella che si dovrebbe trovare a destra di quella che ha scatenato l'evento esiste
    if ((iColumnCell + 1) < DIM) {
        toggleCell(iRowCell, iColumnCell + 1);
    }

    // Incremento le mosse
    mosse++;
    // Aggiorno le mosse effettuate sull'HTML
    document.getElementById("ris").innerText = mosse;

    // Inizializzo vittoria
    let vittoria = true;
    // Controllo il colore di sfondo di tutte le celle
    let i = 0;
    do {
        let j = 0;
        do {
            if (document.getElementById(`cella-${i}-${j}`).style.backgroundColor != GIALLO) {
                vittoria = false;
            }
            j++;
        } while (j < DIM && vittoria);
        i++;
    } while (i < DIM && vittoria);

    // Mi chiedo se ho vinto
    if (vittoria) {
        // Rendo visibile all'utente il messaggio di vittoria
        document.getElementById("vittoria").style.display = "block";
        // Disabilito l'evento click a tutte le celle
        for (let i = 0; i < DIM; i++) {
            for (let j = 0; j < DIM; j++) {
                document.getElementById(`cella-${i}-${j}`).removeEventListener("click", cellClcik);
            }
        }
    }
}

function toggleCell(i, j) {
    // Recupero il riferimento alla cella nella posizione i, j
    const cell = document.getElementById(`cella-${i}-${j}`);

    // Mi chiedo qual'è il colore di sfondo di questa cella
    if (cell.style.backgroundColor == GRIGIO)
        // Il colore di sfondo diventa GIALLO
        cell.style.backgroundColor = GIALLO;
    else
        // Il colore di sfondo diventa GRIGIO
        cell.style.backgroundColor = GRIGIO;
}