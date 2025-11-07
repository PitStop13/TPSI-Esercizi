"use strict";

let vet = ["mano", "sasso", "forbice"]

window.onload = function () {
    // Recupero i riferimenti agli elementi che mi servono
    let _imgUtente = document.getElementById("imgUtente");
    let _imgComputer = document.getElementById("imgComputer");
    let _small = document.getElementsByClassName("small");
    let _btnGioca = document.getElementById("btnGioca");
    let _txtRisultato = document.getElementById("txtRisultato");
    // porto il risultato ad una stringa vuota
    _txtRisultato = "";

    // Porto il background dei div che contegono le mosse del utente e del giocatore a vuoto
    _imgUtente.style.backgroundImage = 'url("./img/vuota.png")';
    _imgComputer.style.backgroundImage = 'url("./img/vuota.png")';

    // Assegno ad ogni miniatura il suo backgroundImage
    _small[0].style.backgroundImage = 'url("./img/mano.png")';
    _small[1].style.backgroundImage = 'url("./img/sasso.png")';
    _small[2].style.backgroundImage = 'url("./img/forbice.png")';

    // Per ogni miniatura aggiungo la proprietà click
    for (let div of _small) {
        div.addEventListener("click", sceltaUtente);
    }

    // Aggiungo la proprietà click al btnGioca
    _btnGioca.addEventListener("click", btnGiocaClicked);
}


function random(min, max) {
    // Genero un numero random tra a e b, con a incluso e b escluso
    return Math.floor((max - min) * Math.random()) + min;
}

function sceltaUtente() {
    // Assegno al div con id imgUtente il backgroundImage del div con classe small cliccato
    document.getElementById("imgUtente").style.backgroundImage = this.style.backgroundImage;
    // Porto il backgroundImage della mossa del computer a vuoto
    document.getElementById("imgComputer").style.backgroundImage = 'url("./img/vuota.png")';
}

function btnGiocaClicked() {
    // Il risultato diventa una stringa vuota
    document.getElementById("txtRisultato").innerText = "";

    // recupero i riferimenti ai div della mossa dell'utente e del computer
    let _imgUtente = document.getElementById("imgUtente");
    let _imgComputer = document.getElementById("imgComputer");

    // Mi chiedo se il div dell'utente ha come immagine una carta vuota
    if (_imgUtente.style.backgroundImage == 'url("./img/vuota.png")') {
        alert("Inserisci una carta");
        return;
    }

    let index = 0;
    // Ripeto finché la mossa generata è uguale a quella dell'utente
    do {
        index = random(0, 3);
    } while (_imgUtente.style.backgroundImage == `url("./img/${vet[index]}.png")`);/*while(_imgUtente.style.backgroundImage == backGround);*/

    // Porto il backgroundImage del div della mossa del computer alla mossa generata
    _imgComputer.style.backgroundImage = `url(./img/${vet[index]}.png)`;

    // Recupero il riferimento al div con classe txtRisultato
    let txtRisultato = document.getElementById("txtRisultato");
    // Faccio lo switch della mossa del computer
    switch (index) {
        case 0:
            // Mi chiedo qual'è la mossa dell'utente
            if (_imgUtente.style.backgroundImage == `url("./img/sasso.png")`) {
                txtRisultato.innerText = "Il computer ha vinto";
            }
            else {
                txtRisultato.innerText = "Il giocatore ha vinto";
            }
            break;
        case 1:
            // Mi chiedo qual'è la mossa dell'utente
            if (_imgUtente.style.backgroundImage == `url("./img/forbice.png")`) {
                txtRisultato.innerText = "Il computer ha vinto";
            }
            else {
                txtRisultato.innerText = "Il giocatore ha vinto";
            }
            break;
        case 2:
            // Mi chiedo qual'è la mossa dell'utente
            if (_imgUtente.style.backgroundImage == `url("./img/mano.png")`) {
                txtRisultato.innerText = "Il computer ha vinto";
            }
            else {
                txtRisultato.innerText = "Il giocatore ha vinto";
            }
            break;
    }
}