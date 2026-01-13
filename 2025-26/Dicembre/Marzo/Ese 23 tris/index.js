// Inzializzo il contatore dei turni
//                      |Turno = 1 ---> giocatore 1 (croce)
// prof Solution -->   {
//                      |Turno = 2 ---> giocatore 2 (cerchio)
let turno = 0;


// Conta quante giocate sono state effettuate (prof Solution)
let contGiocate = 0;

// Struttura dati di appoggio (prof solution)
let partita = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

window.addEventListener("load", function () {
    // Recupero il riferimento alla tabella
    // const table = documnet.querySelector("table");
    const table = document.getElementsByTagName("table")[0];

    // Faccio un for che mi crea 3 righe della tabella
    for (let i = 0; i < 3; i++) {
        // Cero un tr e lo appendo alla tabella
        const tr = document.createElement("tr");
        // Faccio un for che mi crea 3 colonne per ogni riga della tabella
        for (let j = 0; j < 3; j++) {
            // Creo un td e lo appendo dentro il tr creato prima
            const td = document.createElement("td");
            // Creo un immagine e la appendo al td creato prima
            const img = document.createElement("img");
            img.src = "img/vuota.png";
            img.id = `img-${i}-${j}`;
            img.alt = "vuota";
            // Aggiungo l'evento sul click dell'immagine
            img.addEventListener("click", imgClick);
            // Soluzione prof
            //img.addEventListener("click", imgClickProf);
            td.appendChild(img);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
});

function imgClick() {
    // Incremento il turno
    turno++;

    // Mi chiedo se il turno è pari o dispari
    if (turno % 2 == 0) {
        // Cambio l'src e l'alt dell'immagine cliccata con il cerchio
        this.src = "img/cerchio.png";
        this.alt = "cerchio";
    }
    else {
        // Cambio l'src e l'alt dell'immagine cliccata con la croce
        this.src = "img/croce.png";
        this.alt = "croce";
    }

    // Rimuovo l'evento di click sull'immagine cliccata
    this.removeEventListener("click", imgClick);


    // Mi chiedo se turno è maggiore o uguale a 5
    if (turno >= 5) {

        // Creo un for che mi scorre righe e colonne della tabella
        for (let i = 0; i < 3; i++) {

            // Recupero il riferimento alle colonne della riga i
            const imgCol0 = document.getElementById(`img-${i}-0`);
            const imgCol1 = document.getElementById(`img-${i}-1`);
            const imgCol2 = document.getElementById(`img-${i}-2`);

            // Mi chiedo se le immagini sulla riga i non hanno alt "vuota" e le loro src sono tutte uguali
            if (imgCol0.alt != "vuota" && imgCol0.src == imgCol1.src && imgCol1.src == imgCol2.src) {

                // Richiamo la funzione vittoria, gli passo un img della riga e fermo la funzione corrente
                vittoria(imgCol0);
                return;
            }

            // Recupero il riferimento alle righe della colonna i
            const imgRow0 = document.getElementById(`img-0-${i}`);
            const imgRow1 = document.getElementById(`img-1-${i}`);
            const imgRow2 = document.getElementById(`img-2-${i}`);

            // Mi chiedo se le immagini sulla colonna i non hanno alt "vuota" e le loro src sono tutte uguali
            if (imgRow0.alt != "vuota" && imgRow0.src == imgRow1.src && imgRow1.src == imgRow2.src) {

                // Richiamo la funzione vittoria, gli passo un img della colonna e fermo la funzione corrente
                vittoria(imgRow0);
                return;
            }
        }

        // Recupero il riferimento alla diagonale principale (i == j)
        const imgDiagPrinc0 = document.getElementById(`img-0-0`);
        const imgDiagPrinc1 = document.getElementById(`img-1-1`);
        const imgDiagPrinc2 = document.getElementById(`img-2-2`);

        // Mi chiedo se le immagini sulla diagonale principale non hanno alt "vuota" e le loro src sono tutte uguali
        if (imgDiagPrinc0.alt != "vuota" && imgDiagPrinc0.src == imgDiagPrinc1.src && imgDiagPrinc1.src == imgDiagPrinc2.src) {

            // Richiamo la funzione vittoria, gli passo un img della diagonale principale e fermo la funzione corrente
            vittoria(imgDiagPrinc0);
            return;
        }

        // Recupero il riferimento alla diagonale secondaria (i + j == 2)
        const imgDiagSec0 = document.getElementById(`img-0-2`);
        const imgDiagSec1 = document.getElementById(`img-1-1`);
        const imgDiagSec2 = document.getElementById(`img-2-0`);

        // Mi chiedo se le immagini sulla diagonale secondaria non hanno alt "vuota" e le loro src sono tutte uguali
        if (imgDiagSec0.alt != "vuota" && imgDiagSec0.src == imgDiagSec1.src && imgDiagSec1.src == imgDiagSec2.src) {

            // Richiamo la funzione vittoria, gli passo un img della diagonale secondaria e fermo la funzione corrente
            vittoria(imgDiagSec0);
            return;
        }
    }

    // Mi chiedo se turno è uguale a 9
    if (turno == 9) {
        // Recupero il riferimento al div risulatato
        const risultato = document.getElementById("divRisultato");
        // Comunico ai giocatori che hanno pareggiato
        risultato.innerText = "Pareggio";
    }
}

function vittoria(img) {
    // Recupero il riferimento a tutte le immagini
    const images = document.getElementsByTagName("img");

    // Creo un for che mi scorre tutte le immagini
    for (let i = (turno - 1); i < 9; i++) {
        // Rimuovo l'evento click sulle immagini
        images[i].removeEventListener("click", imgClick);
    }

    // Recupero il riferimento al div risultato
    const risultato = document.getElementById("divRisultato");

    // Mi quale segno ha l'immagine passata nella funzione 
    if (img.alt == "cerchio") {
        // Ha vinto il giocatore 2
        risultato.innerText = "Ha vinto il giocatore 2 (Cerchio)";
    }
    else {
        // Ha vinto il giocatore 1
        risultato.innerText = "Ha vinto il giocatore 1 (Croce)";
    }
}

function imgClickProf(){
    // Recupero la posizione i e j dell'immagine tramite id
    const iR = parseInt(this.id.split("-")[1]);
    const iC = parseInt(this.id.split("-")[2]);

    // Aggiorno la struttura dati "partita"
    partita [iR][iC] = turno;

    if (turno == 1) {
        // Cambio l'src e l'alt dell'immagine cliccata con il cerchio
        this.src = "img/cerchio.png";
        turno = 2;
    }
    else {
        // Cambio l'src e l'alt dell'immagine cliccata con la croce
        this.src = "img/croce.png";
        turno = 1;
    }

    // Rimuovo l'evento di click sull'immagine cliccata
    this.removeEventListener("click", imgClick);

    contGiocate++;

    // Controllo se il giocatre ha vinto
    let rigaWin = colonnaWin = dpWin = dsWin = true;
    for (let i = 0; i < 3; i++) {
        rigaWin = true;
        colonnaWin = true;
        for (let j = 0; j < 3; j++) {
            // Controllo riga
            if (partita[i][j] != turno) {
                rigaWin = false;
                break;
            }

            // Controllo colonna
            if(partita[j][i] != turno)
            {
                colonnaWin = false;
            }

            // Controllo diagonale prinicpale
            if (i == j && partita[i][j] != turno) {
                dpWin = false;
            }

            // Controlo diagonale secondaria
            if (i + j == 2 && partita[i][j] != turno) {
                dsWin = false;
            }
        }

        if (rigaWin || colonnaWin) {
            document.getElementById("divRisultato").innerText = "Giocatore" + turno + "ha vinto";
            disabilitaClickImg();
            break;
        }
    }

    if(dpWin || dsWin){
        document.getElementById("divRisultato").innerText = "Giocatore" + turno + "ha vinto";
        disabilitaClickImg();
    }

    // Se ho vinto all'ultimo tentativo non devo mostrare "pareggio"
    if(contGiocate == 9 && !rigaWin && !colonnaWin && !dpWin && !dsWin)
    {
        document.getElementById("divRisultato").innerText = "Pareggio";
    }
}

function disabilitaClickImg(){
    const images = document.getElementsByTagName("img");

    for (const val of images) {
        val.removeEventListener("click", imgClick);
    }
}