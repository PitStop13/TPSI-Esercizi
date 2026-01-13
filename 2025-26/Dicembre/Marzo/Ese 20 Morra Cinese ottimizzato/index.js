"use strict";

let vet = ["mano", "sasso", "forbice"]

window.onload = function () {
    // Recupero i riferimenti agli elementi che mi servono
    let _small = document.getElementsByClassName("small");
    let _big = document.getElementsByClassName("big");
    let _btnGioca = document.getElementById("btnGioca");
    let _txtRisultato = document.getElementById("txtRisultato");
    // Porto il risultato ad una stringa vuota
    _txtRisultato = "";

    // Porto il background dei div che contegono le mosse del utente e del giocatore a vuoto
    for(const item of _big){
        item.style.backgroundImage= 'url("./img/vuota.png")';
    }

    // Assegno ad ogni miniatura il suo backgroundImage e aggiungo la proprietà click
    for(let i = 0; i < _small.length; i++){
        _small[i].style.backgroundImage = `url("./img/${vet[i]}.png")`;
        _small[i].addEventListener("click", sceltaUtente);
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

    // Recupero i riferimenti ai div della mossa dell'utente e del computer
    const _imgUtente = document.getElementById("imgUtente");
    const _imgComputer = document.getElementById("imgComputer");
    const pathUtente = _imgUtente.style.backgroundImage;

    // Mi chiedo se il div dell'utente ha come immagine vuota.png non è stata effetuata una scelta e non posso proseguire
    if (pathUtente == 'url("./img/vuota.png")') {
        alert("Scegli una mossa!");
        return;
    }

    let index = 0;
    // Ripeto finché la mossa generata è uguale a quella dell'utente
    do {
        index = random(0, 3);
    } while (pathUtente == `url("./img/${vet[index]}.png")`);

    // Porto il backgroundImage del div della mossa del computer alla mossa generata
    _imgComputer.style.backgroundImage = `url(./img/${vet[index]}.png)`;

    // Recupero il riferimento al div con classe txtRisultato
    let txtRisultato = document.getElementById("txtRisultato");

    // Controllo il vincitore
    let computerVincitore = false;
    if((pathUtente == 'url("./img/mano.png")' && _imgComputer.style.backgroundImage == 'url("./img/forbice.png")') || (pathUtente == 'url("./img/sasso.png")' && _imgComputer.style.backgroundImage == 'url("./img/mano.png")') || (pathUtente == 'url("./img/forbice.png")' && _imgComputer.style.backgroundImage == 'url("./img/sasso.png")'))
    {
        computerVincitore = true;
    }

    if(computerVincitore)
    {
        txtRisultato.innerText = "Il computer ha vinto";
    }
    else{
        txtRisultato.innerText = "Il giocatore ha vinto";
    }
}