// Punteggio giocatore
let puntGioc = 0;
// N carte pescate giocatore
let pescateGioc = 0;

// Punteggio banco
let puntBanco = 0;

window.addEventListener("load", function () {
    const carteGioc = document.getElementsByName("cartaGioc");
    for (const carta of carteGioc) {
        carta.src = "img/back.gif";
    }

    document.getElementById("btnStop").addEventListener("click", fermaGioco);
    document.getElementById("btnPesca").addEventListener("click", pescaCarta);
});

function fermaGioco() {
    // Disabilito pulsanti giocatore
    document.getElementById("btnPesca").disabled = true;
    document.getElementById("btnStop").disabled = true;

    do {
        const carta = Math.floor(Math.random() * 10) + 1;
        let seme = Math.floor(Math.random() * 4);
        let valore;

        // Calcolo il valore della carta pescata
        if (carta <= 7) {
            valore = carta;
        }
        else {
            valore = 0.5;
        }

        puntBanco += valore;
    } while (puntBanco <= 5.5);

    document.getElementById("punteggioBanco").textContent = puntBanco;
    document.getElementById("paragrafoPuntBanco").style.display = "block";

    let messaggio = "";
    if(puntBanco > 7.5 || puntGioc > puntBanco)
    {
        messaggio = "Hai vinto";
    }
    else{
        messaggio = "Hai perso";
    }

    document.getElementById("risultato").textContent = messaggio;
}

function pescaCarta() {
    const carta = Math.floor(Math.random() * 10) + 1;
    let seme = Math.floor(Math.random() * 4);
    let valore;

    // Calcolo il valore della carta pescata
    if (carta <= 7) {
        valore = carta;
    }
    else {
        valore = 0.5;
    }

    // Assegnazione seme carta pescata
    // 0: c, 1: f, 2: p, 3:q
    switch (seme) {
        case 0:
            seme = "c";
            break;
        case 1:
            seme = "f";
            break;
        case 2:
            seme = "p";
            break;
        case 3:
            seme = "q";
            break;
    }

    // Aggiorno punteggio giocatore
    puntGioc += valore;
    document.getElementById("punteggioGioc").textContent = puntGioc;

    //Mostro la carta pescata
    const carteGioc = document.getElementsByName("cartaGioc")[pescateGioc].src = `img/${carta}${seme}.gif`;

    // Aggiorno le carte carte pescate del giocatore
    pescateGioc++;

    // gestisco caso sballo giocatore
    if (puntGioc > 7.5) {
        // Disabilito pulsanti giocatore
        document.getElementById("btnPesca").disabled = true;
        document.getElementById("btnStop").disabled = true;
        // Mostro risultato partita
        document.getElementById("risultato").textContent = "Hai perso! Superato 7.5";
    }
    else if (puntGioc == 7.5) {
        fermaGioco();
    }
}