"use strict";
/*********** Dichiaro le variabili globali ***********/

// Mi salvo i punti del giocatore
let puntiGiocatore;
// Array che contiene le carte girate del giocatore
let carteG = [12];
// Mi salvo la prima posLibera dell'array carteG
let posLiberaCartaG = 0;
// Mi salvo se la carta generata dal mazzo del giocatore è un asso
let assoG = false;
// Mi salvo i punti del banco
let puntiBanco;
// Array che contiene le carte girate del banco
let carteB = [12];
// Mi salvo la prima posLibera dell'array carteB
let posLiberaCartaB = 0;
// Mi salvo se la carta generata dal mazzo del banco è un asso
let assoB = false;
// Mi salvo i soldi puntati dal giocatore
let soldiPuntati = 0;
// Array che contiene le fish puntate dal giocatore
let fishPuntate = [12];
// Mi salvo la prima posizione libera dell'array fishPuntate
let posLiberaFishPuntate = 0;
// Mi salvo la carta precedente
let cartaPrecedente = "";

window.onload = function () {
    /*********** Inizializzazioni ***********/

    let mazzoG = document.getElementById("mazzo-g");
    let mazzoB = document.getElementById("mazzo-b");

    // inizializzo l'opacity del mazzo del giocatore e del banco a 0.5
    mazzoG.style.opacity = 0.5;
    mazzoB.style.opacity = 0.5;

    // Genero un colore posteriore random tra blu e rosso della carta da estrarre dal mazzo del giocatore
    let numG = generaNumero(1, 3)
    if (numG == 1) {
        mazzoG.style.backgroundImage = "url('./img/RetroCartaBlu.gif')";
    }
    else {
        mazzoG.style.backgroundImage = "url('./img/RetroCartaRossa.gif')";
    }

    // Genero un colore posteriore random tra blu e rosso della carta da estrarre dal mazzo del banco
    let numB = generaNumero(1, 3)
    if (numB == 1) {
        mazzoB.style.backgroundImage = "url('./img/RetroCartaBlu.gif')";
    }
    else {
        mazzoB.style.backgroundImage = "url('./img/RetroCartaRossa.gif')";
    }

    // Inizializzo i soldi puntati a zero
    document.getElementsByTagName("span")[2].innerText = "0";

    // Inizializzo il testo risultato al suo valore di default
    document.getElementById("result").innerText = "Risultato della partita:";

    // Inizializzo i punti a zero del giocatore e del banco
    puntiGiocatore = 0;
    document.getElementsByTagName("span")[0].innerText = `${puntiGiocatore}`;
    puntiBanco = 0;
    document.getElementsByTagName("span")[1].innerText = `${puntiBanco}`;

    // Inizializzo le fish a opacity 0.5
    let id = document.getElementById("puntata");
    for (let div of id.children) {
        div.style.opacity = 0.5;
    }

    // Sul mouse over delle card dell giocatore che sono da girare assegno opacity 1
    mazzoG.addEventListener("mouseover", mouseOver);
    mazzoB.addEventListener("mouseover", mouseOver);

    // Sul mouse out delle card del giocatore che sono da girare assegno opacity 0.5
    mazzoG.addEventListener("mouseout", mouseOut);
    mazzoB.addEventListener("mouseout", mouseOut);

    // Sul muose click della card del giocatore assegno una funzione 
    mazzoG.addEventListener("click", mazzoGClicked);

    // Sul muose click della card del banco assegno una funzione 
    mazzoB.addEventListener("click", mazzoBClicked);

    // Sul mouse over delle fish assegno opacity 1
    for (let div of id.children) {
        div.addEventListener("mouseover", mouseOver);
    }

    // Sul mouse out delle fish assegno opacity 0.5
    for (let div of id.children) {
        div.addEventListener("mouseout", mouseOut);
    }

    // Sul click delle fish assegno una funzione
    for (let div of id.children) {
        div.addEventListener("click", fishClicked);
    }

    // Recupero il riferimento al div con id reset
    let reset = document.getElementById("reset");

    // Sul mouse over del button reset assegno una funzione
    reset.addEventListener("mouseover", resetOver);

    // Sul mouse out del button reset assegno una funzione
    reset.addEventListener("mouseout", resetOut);

    // Sul click del button reset assegno una funzione
    reset.addEventListener("click", resetClicked);
}

function mouseOver() {
    // Metto il cursor pointer sul mouse
    this.style.cursor = "pointer";

    // Porto l'opacity dell'elemento che ha scatenato l'evento a 1
    this.style.opacity = 1;
}

function mouseOut() {
    // Metto il cursor normale sul mouse
    this.style.cursor = "default";

    // Porto l'opacity dell'elemento che ha scatenato l'evento al suo valore di default
    this.style.opacity = 0.5;
}

function generaNumero(a, b) {
    // Genero un numero random tra a e b, con a incluso e b escluso
    return Math.floor((b - a) * Math.random()) + a;
}

function mazzoGClicked() {
    // Inizializzo le fish a opacity 0.5
    let id = document.getElementById("puntata");

    // Sul mouse over delle fish rimuovo opacity 1
    for (let div of id.children) {
        div.removeEventListener("mouseover", mouseOver);
    }

    // Sul mouse out delle fish rimuovo opacity 0.5
    for (let div of id.children) {
        div.removeEventListener("mouseout", mouseOut);
    }

    // Sul click delle fish rimuovo una funzione
    for (let div of id.children) {
        div.removeEventListener("click", fishClicked);
    }

    // Se assoG è true vuol dire che l'ultima carta era un asso, quindi devo togliere l'id al div dell'asso e a quello del valore
    if (assoG) {
        document.getElementById("asso-g").removeEventListener("click", assoGClicked);
        // Metto il cursor normale sul mouse
        document.getElementById("asso-g").style.cursor = "default";
        document.getElementById("asso-g").removeAttribute("id");
        assoG = false;
    }

    // Inizializzo le variabili per controllare se la carta generata è valida o meno
    let cartaRipetuta = false;
    let contCartePresenti = 0;
    let numero = 0;
    let carta = "";

    do {
        // Genero il seme della carta
        let seme = generaNumero(97, 101);

        // Assegno a carta il valore char del seme generato
        carta = String.fromCharCode(seme);

        // Genero il numero della carta
        numero = generaNumero(1, 14);

        // Assegno a carta il valore di numero
        carta += `${numero}.gif`;

        // Reiniziaalizzo cartaRipetuta e contCartePresenti
        cartaRipetuta = false;
        contCartePresenti = 0;

        // Creo un for che mi scorre le carte del giocatore e conto quante volte la carata attualmente generate è stata generata
        for (let i = 0; i < carteG.length; i++) {
            if (carteG.includes(carta)) {
                cartaRipetuta = true;
            }
            if (carteG[1] == carta[1] && carteG[2] == carta[2]) {
                contCartePresenti++;
            }
        }

        // Ripeto finchè: 
        // la carata generata attualmente è diversa da quella generata la volta prima,
        // la carta è uguale ad una già girata,
        // la carta con valore di quella attuale è stata generata quattro volte
    } while (carta[0] == cartaPrecedente[0]
    && carta[1] == cartaPrecedente[1]
    && carta[2] == cartaPrecedente[2]
    && cartaRipetuta
        && contCartePresenti >= 4);

    // Porto il valore di carteG nella prima posizione libera a carta e aumento la prima posizione libera
    carteG[posLiberaCartaG] = carta;
    posLiberaCartaG++;

    if (numero == 1) {
        // Creo un div con backgroundImage della carta generata
        let card = document.createElement("div");
        card.style.backgroundImage = `url("./img/${carta}")`;
        // Setto larghezza e altezza
        card.style.width = "71px";
        card.style.height = "96px";
        // Metto il cursor pointer sul mouse
        card.style.cursor = "pointer";
        // Assegno al div l'id assoG
        card.id = "asso-g";
        // Creo un evento che se clicco sull'asso mi porta ad una funzione
        card.addEventListener("click", assoGClicked);
        // Appendo il div
        document.getElementById("giocatore").appendChild(card);

        // Creo il div che dice all'utente il valore della carta corrente
        let valueCard = document.createElement("div");
        // Setto larghezza e altezza
        valueCard.style.width = "71px";
        valueCard.style.height = "18px";
        // Assegno al div il valore della carta generata
        valueCard.innerText = numero;
        // Assegno al div l'id assoGValue
        valueCard.id = "asso-g-value";
        // Setto colore e allineamento del testo
        valueCard.style.color = "white";
        valueCard.style.textAlign = "center";
        // Appendo il div e porto assoG a true
        document.getElementById("value-card-g").appendChild(valueCard);
        assoG = true;

        // Aggiorno il punteggio del giocatore
        puntiGiocatore += numero;
        document.getElementsByTagName("span")[0].innerText = `${puntiGiocatore}`;
    }
    else {
        // Creo un div con backgroundImage della carta generata
        let card = document.createElement("div");
        card.style.backgroundImage = `url("./img/${carta}")`;
        // Setto larghezza e altezza
        card.style.width = "71px";
        card.style.height = "96px";
        // Appendo il div
        document.getElementById("giocatore").appendChild(card);

        // Creo il div che dice all'utente il valore della carta corrente
        let valueCard = document.createElement("div");
        // Setto larghezza e altezza
        valueCard.style.width = "71px";
        valueCard.style.height = "18px";
        // Se la carta generata è una figura aumento i punti del giocatore di 10 altrimenti li aumento del valore del numero generato
        if (numero >= 11) {
            puntiGiocatore += 10;
            document.getElementsByTagName("span")[0].innerText = `${puntiGiocatore}`;
            // Assegno al div il valore della carta generata
            valueCard.innerText = 10;
        }
        else {
            puntiGiocatore += numero;
            document.getElementsByTagName("span")[0].innerText = `${puntiGiocatore}`;
            // Assegno al div il valore della carta generata
            valueCard.innerText = numero;
        }
        // Setto colore e allineamento del testo
        valueCard.style.color = "white";
        valueCard.style.textAlign = "center";
        // Appendo il div
        document.getElementById("value-card-g").appendChild(valueCard);
    }


    // Se il punteggio del giocatore è maggiore di 21 disabilito tutti gli eventi sul mazzo di carte e gli comuncio che hai perso
    if (puntiGiocatore > 21) {
        document.getElementById("result").innerText += " Hai perso";
        // Rimuovo tutti gli eventi al mazzo del giocatore e a quello del banco
        let mazzoG = document.getElementById("mazzo-g");
        let mazzoB = document.getElementById("mazzo-b");
        mazzoG.removeEventListener("click", mazzoGClicked);
        mazzoG.removeEventListener("mouseover", mouseOver);
        mazzoG.removeEventListener("mouseout", mouseOut);
        mazzoB.removeEventListener("click", mazzoBClicked);
        mazzoB.removeEventListener("mouseover", mouseOver);
        mazzoB.removeEventListener("mouseout", mouseOut);
        // Setto l'opacity del mazzo del giocatore al suo valore di default
        mazzoG.style.opacity = 0.5;

        if (assoG) {
            // Se assoG è true vuol dire che questa carta era un asso, quindi devo togliere l'id al div dell'asso e a quello del valore
            if (assoG) {
                document.getElementById("asso-g").removeEventListener("click", assoGClicked);
                // Metto il cursor normale sul mouse
                document.getElementById("asso-g").style.cursor = "default";
                document.getElementById("asso-g").removeAttribute("id");
                assoG = false;
            }
        }

        // Mostro all'utente, con un avviso, il risultato
        mostraAvviso("Hai perso, hai sforato");
    }
}

function assoGClicked() {
    // Aumento il punteggio del giocatore di 10 punti e aggiorno il punteggio del giocatore
    puntiGiocatore += 10;
    document.getElementsByTagName("span")[0].innerText = `${puntiGiocatore}`;
    document.getElementById("asso-g").removeEventListener("click", assoGClicked);

    // Cambio il valore del div che dice all'utente il valore delle carte e poi gli rimuovo l'id
    document.getElementById("asso-g-value").innerText = 11;

    // Se il punteggio del giocatore è maggiore di 21 disabilito tutti gli eventi sul mazzo di carte e gli comuncio che hai perso
    if (puntiGiocatore > 21) {
        document.getElementById("result").innerText += " Hai perso";
        // Rimuovo tutti gli eventi al mazzo del giocatore e a quello del banco
        let mazzoG = document.getElementById("mazzo-g");
        let mazzoB = document.getElementById("mazzo-b");
        mazzoG.removeEventListener("click", mazzoGClicked);
        mazzoG.removeEventListener("mouseover", mouseOver);
        mazzoG.removeEventListener("mouseout", mouseOut);
        mazzoB.removeEventListener("click", mazzoBClicked);
        mazzoB.removeEventListener("mouseover", mouseOver);
        mazzoB.removeEventListener("mouseout", mouseOut);

        // Setto l'opacity del mazzo del giocatore al suo valore di default
        mazzoG.style.opacity = 0.5;

        // Mostro all'utente, con un avviso, il risultato
        mostraAvviso("Hai perso, hai sforato");
    }
}

function mostraAvviso(messaggio) {
    // Recupero il riferimento al div con id reset
    let reset = document.getElementById("reset");

    // Rimuovo l'evento mouse over sul bottone del reset
    reset.removeEventListener("mouseover", resetOver);

    // Rimuovo l'evento mouse out sul bottone del reset
    reset.removeEventListener("mouseout", resetOut);

    // Rimuovo l'evento click sul bottone del reset
    reset.removeEventListener("click", resetClicked);

    // Creo un div dove inserisco il risultato della partita
    const avviso = document.createElement("div");
    avviso.style.alignContent = "center";
    avviso.textContent = messaggio;
    avviso.style.color = "white";
    avviso.style.fontSize = "20pt";
    avviso.style.fontWeight = "bolder";
    avviso.style.textAlign = "center";
    avviso.style.position = "fixed";
    avviso.style.width = "15%";
    avviso.style.height = "15%";
    avviso.style.top = "50%";
    avviso.style.left = "50%";
    avviso.style.transform = "translate(-50%, -50%)";
    avviso.style.backgroundColor = "black";
    avviso.style.textShadow = "0 0 7px rgba(218,179,134,255), 0 0 10px rgba(218,179,134,255), 0 0 21px rgba(218,179,134,255), 0 0 42px rgba(179,157,118,255), 0 0 82px rgba(179,157,118,255), 0 0 92px rgba(179,157,118,255), 0 0 102px rgba(179,157,118,255), 0 0 151px rgba(179,157,118,255)";
    avviso.style.boxShadow = "0 0 7px rgba(218,179,134,255), 0 0 2px rgba(218,179,134,255), 0 0 5px rgba(218,179,134,255), 0 0 7px rgba(179,157,118,255), 0 0 8px rgba(179,157,118,255), 0 0 10px rgba(179,157,118,255), 0 0 15px rgba(179,157,118,255)";
    avviso.style.border = "1px solid black";
    avviso.style.borderRadius = "20px";
    avviso.style.padding = "20px";
    document.body.appendChild(avviso);

    // Background opacity diventa 0.5
    document.getElementById("background").style.opacity = 0.5;

    // Rimuovi l'avviso dopo un 3 secondi (3000 millisecondi)
    setTimeout(() => {
        // Rimovo avviso
        document.body.removeChild(avviso);

        // Background opacity torna al valore di default
        document.getElementById("background").style.opacity = 1;

        // Disabilito il pulsante ricomincia
        document.getElementById("reset").addEventListener("click", resetClicked);

        // Recupero il riferimento al div con id reset
        let reset = document.getElementById("reset");

        // Aggiungo l'evento mouse over sul bottone del reset
        reset.addEventListener("mouseover", resetOver);

        // Aggiungo l'evento mouse out sul bottone del reset
        reset.addEventListener("mouseout", resetOut);

        // Aggiungo l'evento click sul bottone del reset
        reset.addEventListener("click", resetClicked);
    }, 3000);
}

function mazzoBClicked() {
    // Inizializzo le fish a opacity 0.5
    let id = document.getElementById("puntata");

    // Sul mouse over delle fish rimuovo opacity 1
    for (let div of id.children) {
        div.removeEventListener("mouseover", mouseOver);
    }

    // Sul mouse out delle fish rimuovo opacity 0.5
    for (let div of id.children) {
        div.removeEventListener("mouseout", mouseOut);
    }

    // Sul click delle fish rimuovo una funzione
    for (let div of id.children) {
        div.removeEventListener("click", fishClicked);
    }

    // Rimuovo tutti gli eventi al mazzo del giocatore
    let mazzoG = document.getElementById("mazzo-g");
    mazzoG.removeEventListener("click", mazzoGClicked);
    mazzoG.removeEventListener("mouseover", mouseOver);
    mazzoG.removeEventListener("mouseout", mouseOut);

    // Setto l'opacity del mazzo del giocatore al suo valore di default
    mazzoG.style.opacity = 0.5;

    // Inizializzo le variabili per controllare se la carta generata è valida o meno
    let cartaRipetuta = false;
    let contCartePresenti = 0;
    let numero = 0;
    let carta = "";

    do {

        // Genero il seme della carta
        let seme = generaNumero(97, 101);

        // Assegno a carta il valore char del seme generato
        carta = String.fromCharCode(seme);

        // Genero il numero della carta
        numero = generaNumero(1, 14);

        // Assegno a carta il valore di numero
        carta += `${numero}.gif`;

        // Creo un for che mi scorre le carte del banco e conto quante volte la carata attualmente generate è stata generata
        for (let i = 0; i < carteB.length; i++) {
            if (carteB.includes(carta)) {
                cartaRipetuta = true;
            }
            if (carteB[1] == carta[1] && carteB[2] == carta[2]) {
                contCartePresenti++;
            }
        }

        // Ripeto finchè: 
        // la carata generata attualmente è diversa da quella generata la volta prima,
        // la carta è uguale ad una già girata,
        // la carta con valore di quella attuale è stata generata quattro volte
    } while (carta[0] == cartaPrecedente[0]
    && carta[1] == cartaPrecedente[1]
    && carta[2] == cartaPrecedente[2]
    && cartaRipetuta
        && contCartePresenti >= 4);

    // Porto il valore di carteB nella prima posizione libera a carta e aumento la prima posizione libera
    carteB[posLiberaCartaB] = carta;
    posLiberaCartaB++;

    if (numero == 1) {
        // Creo un div con backgroundImage della carta generata
        let card = document.createElement("div");
        card.style.backgroundImage = `url("./img/${carta}")`;
        // Setto larghezza e altezza
        card.style.width = "71px";
        card.style.height = "96px";
        // Assegno al div l'id assoB
        card.id = "asso-b";
        // Appendo il div
        document.getElementById("banco").appendChild(card);

        // Creo il div che dice all'utente il valore della carta corrente
        let valueCard = document.createElement("div");
        // Setto larghezza e altezza
        valueCard.style.width = "71px";
        valueCard.style.height = "18px";
        // Assegno al div l'id assoBValue
        valueCard.id = "asso-b-value";
        // Setto colore e allineamento del testo
        valueCard.style.color = "white";
        valueCard.style.textAlign = "center";
        // Appendo il div e porto assoG a true
        document.getElementById("value-card-b").appendChild(valueCard);
        assoB = true;
    }
    else {
        // Creo un div con backgroundImage della carta generata
        let card = document.createElement("div");
        card.style.backgroundImage = `url("./img/${carta}")`;
        // Setto larghezza e altezza
        card.style.width = "71px";
        card.style.height = "96px";
        // Appendo il div
        document.getElementById("banco").appendChild(card);

        // Creo il div che dice all'utente il valore della carta corrente
        let valueCard = document.createElement("div");
        // Setto larghezza e altezza
        valueCard.style.width = "71px";
        valueCard.style.height = "18px";
        // Se la carta generata è una figura aumento i punti del banco di 10 altrimenti li aumento del valore del numero generato
        if (numero >= 11) {
            puntiBanco += 10;
            document.getElementsByTagName("span")[1].innerText = `${puntiBanco}`;
            // Assegno al div il valore della carta generata
            valueCard.innerText = 10;
        }
        else {
            puntiBanco += numero;
            document.getElementsByTagName("span")[1].innerText = `${puntiBanco}`;
            // Assegno al div il valore della carta generata
            valueCard.innerText = numero;
        }
        // Setto colore e allineamento del testo
        valueCard.style.color = "white";
        valueCard.style.textAlign = "center";
        // Appendo il div
        document.getElementById("value-card-b").appendChild(valueCard);
    }

    // Se ho un asso il banco deve scegliere se farlo vale 1 o 11
    if (assoB) {
        // Se il punteggio del banco più 11 non sfora 21, il banco decide di far vale l'asso 11
        if (puntiBanco + 11 <= 21) {
            // Aumento il punteggio del banco con il valore dell'asso, gli aggiungo 10 e aggiorno il punteggio del banco
            puntiBanco += numero + 10;
            document.getElementsByTagName("span")[1].innerText = `${puntiBanco}`;
            // Assegno al div il valore dell'asso generato
            document.getElementById("asso-b-value").innerText = numero + 10;
        }
        else {
            // Aumento il punteggio del banco con il valore dell'asso e aggiorno il punteggio del banco
            puntiBanco += numero;
            document.getElementsByTagName("span")[1].innerText = `${puntiBanco}`;
            // Assegno al div il valore dell'asso generato
            document.getElementById("asso-b-value").innerText = numero;
        }

        // Tolgo l'id al div dell'asso e a quello del valore
        document.getElementById("asso-b").removeAttribute("id");
        document.getElementById("asso-b-value").removeAttribute("id");
        assoB = false;
    }


    // Se il punteggio del banco è maggiore di 21 disabilito tutti gli eventi sul mazzo di carte e comunico al giocatore che ha vinto
    if (puntiBanco > 21) {
        document.getElementById("result").innerText += " Hai vinto";
        // Rimuovo tutti gli eventi al mazzo del banco
        let mazzoB = document.getElementById("mazzo-b");
        mazzoB.removeEventListener("click", mazzoBClicked);
        mazzoB.removeEventListener("mouseover", mouseOver);
        mazzoB.removeEventListener("mouseout", mouseOut);
        // Setto l'opacity del mazzo del banco al suo valore di default
        mazzoB.style.opacity = 0.5;

        // Mostro all'utente, con un avviso, il risultato
        mostraAvviso("Hai vinto, il Banco ha sforato");
    }
    else if (puntiBanco >= 17) {
        // Rimuovo tutti gli eventi al mazzo del banco
        let mazzoB = document.getElementById("mazzo-b");
        mazzoB.removeEventListener("click", mazzoBClicked);
        mazzoB.removeEventListener("mouseover", mouseOver);
        mazzoB.removeEventListener("mouseout", mouseOut);
        // Setto l'opacity del mazzo del banco al suo valore di default
        mazzoB.style.opacity = 0.5;
        if (puntiBanco >= puntiGiocatore) {
            document.getElementById("result").innerText += " Hai perso";

            // Mostro all'utente, con un avviso, il risultato
            mostraAvviso("Hai perso");
        }
        else {
            document.getElementById("result").innerText += " Hai vinto";

            // Mostro all'utente, con un avviso, il risultato
            mostraAvviso("Hai vinto");
        }
    }
}

function fishClicked() {
    // Ricavo il valore della fish selezionata
    switch (this.id) {
        case "fish-1":
            soldiPuntati += 1;
            break;
        case "fish-5":
            soldiPuntati += 5;
            break;
        case "fish-10":
            soldiPuntati += 10;
            break;
        case "fish-25":
            soldiPuntati += 25;
            break;
        case "fish-50":
            soldiPuntati += 50;
            break;
        case "fish-100":
            soldiPuntati += 100;
            break;
        case "fish-500":
            soldiPuntati += 500;
            break;
        case "fish-1000":
            soldiPuntati += 1000;
            break;
        case "fish-5000":
            soldiPuntati += 5000;
            break;
        case "fish-10000":
            soldiPuntati += 10000;
            break;
        case "fish-25000":
            soldiPuntati += 25000;
            break;
        case "fish-100000":
            soldiPuntati += 100000;
            break;
    }

    // Aggiorno i soldi puntati, mettendo il separatore . ogni 3 cifre
    document.getElementsByTagName("span")[2].innerText = new Intl.NumberFormat().format(soldiPuntati);

    // Prendo il nome della fish
    let fish = this.id;

    // Mi chiedo se ho gia puntato una fish come quella che ha scatenato l'evento
    if (!fishPuntate.includes(fish)) {
        fishPuntate[posLiberaFishPuntate] = fish;
        document.getElementById(`${posLiberaFishPuntate + 1}`).style.backgroundImage = `url("./img/${fish}.png")`;
        posLiberaFishPuntate++;
    }
}

function resetOver() {
    // Metto il cursor pointer
    this.style.cursor = "pointer";

    // Metto text shadow e box shadow
    this.style.textShadow = "0 0 7px rgb(240, 219, 100, 255),0 0 2px rgba(240, 219, 100, 255), 0 0 5px rgba(240, 219, 100, 255), 0 0 7px rgba(240, 221, 118, 255), 0 0 8px rgba(240, 221, 118, 255), 0 0 10px rgba(240, 221, 118, 255), 0 0 15px rgba(240, 221, 118, 255)";
    this.style.boxShadow = "0 0 7px rgb(240, 219, 100, 255), 0 0 2px rgba(240, 219, 100, 255), 0 0 5px rgba(240, 219, 100, 255), 0 0 7px rgba(240, 221, 118, 255), 0 0 8px rgba(240, 221, 118, 255), 0 0 10px rgba(240, 221, 118, 255), 0 0 15px rgba(240, 221, 118, 255)";
}

function resetOut() {
    // Metto il cursor pointer
    this.style.cursor = "default";
    
    // Metto text shadow e box shadow
    this.style.textShadow = "0 0 7px rgba(218,179,134,255), 0 0 10px rgba(218,179,134,255), 0 0 21px rgba(218,179,134,255), 0 0 42px rgba(179,157,118,255), 0 0 82px rgba(179,157,118,255), 0 0 92px rgba(179,157,118,255), 0 0 102px rgba(179,157,118,255), 0 0 151px rgba(179,157,118,255)";
    this.style.boxShadow = "0 0 7px rgba(218,179,134,255), 0 0 2px rgba(218,179,134,255), 0 0 5px rgba(218,179,134,255), 0 0 7px rgba(179,157,118,255), 0 0 8px rgba(179,157,118,255), 0 0 10px rgba(179,157,118,255), 0 0 15px rgba(179,157,118,255)";
}

function resetClicked() {
    /*********** reinizializzazioni ***********/
    // Resetto le variabili sugli assi
    assoG = false;
    assoB = false;

    // Recupero gli elementi che devo reinizializzare
    let giocatore = document.getElementById("giocatore");
    let banco = document.getElementById("banco");
    let valueCardG = document.getElementById("value-card-g");
    let valueCardB = document.getElementById("value-card-b");

    // Elimino i div delle carte generate
    while (giocatore.firstChild) {
        giocatore.removeChild(giocatore.firstChild);
    }
    while (banco.firstChild) {
        banco.removeChild(banco.firstChild);
    }

    // Elimino i div dei valori delle carte generate
    while (valueCardG.firstChild) {
        valueCardG.removeChild(valueCardG.firstChild);
    }
    while (valueCardB.firstChild) {
        valueCardB.removeChild(valueCardB.firstChild);
    }

    // Elimino il background delle fish puntate
    for (let i = 1; i <= 12; i++) {
        document.getElementById(`${i}`).style.backgroundImage = "none";
    }

    // Ricreo i paragrafi e gli span con i punti del giocatore e del banco
    let pPuntiG = document.createElement("p");
    pPuntiG.innerHTML = " Giocatore : <span> 0 </span> ";
    giocatore.appendChild(pPuntiG);
    let pPuntiB = document.createElement("p");
    pPuntiB.innerHTML = " Banco : <span> 0 </span> ";
    banco.appendChild(pPuntiB);

    // Ricreo i mazzi del giocatore e del banco
    let divMazzoG = document.createElement("div");
    divMazzoG.id = "mazzo-g";
    giocatore.appendChild(divMazzoG);
    let divMazzoB = document.createElement("div");
    divMazzoB.id = "mazzo-b";
    banco.appendChild(divMazzoB);

    // Ricreo i div di spazio nella sezione dove viene indicato il valore della carta
    let divValueCardG = document.createElement("div");
    valueCardG.appendChild(divValueCardG);
    let divValueCardB = document.createElement("div");
    valueCardB.appendChild(divValueCardB);

    // Setto l'opacity dei due mazzi di carte a 0.5
    let mazzoG = document.getElementById("mazzo-g");
    let mazzoB = document.getElementById("mazzo-b");
    mazzoG.style.opacity = 0.5;
    mazzoB.style.opacity = 0.5;

    // Genero un colore posteriore random tra blu e rosso della carta da estrarre dal mazzo del giocatore
    let numG = generaNumero(1, 3)
    if (numG == 1) {
        mazzoG.style.backgroundImage = "url('./img/RetroCartaBlu.gif')";
    }
    else {
        mazzoG.style.backgroundImage = "url('./img/RetroCartaRossa.gif')";
    }

    // Genero un colore posteriore random tra blu e rosso della carta da estrarre dal mazzo del banco
    let numB = generaNumero(1, 3)
    if (numB == 1) {
        mazzoB.style.backgroundImage = "url('./img/RetroCartaBlu.gif')";
    }
    else {
        mazzoB.style.backgroundImage = "url('./img/RetroCartaRossa.gif')";
    }

    // Inizializzo i soldi puntati a zero
    document.getElementsByTagName("span")[2].innerText = "0";

    // Inizializzo il testo risultato al suo valore di default
    document.getElementById("result").innerText = "Risultato della partita:";

    // Inizializzo i punti a zero del giocatore e del banco
    puntiGiocatore = 0;
    document.getElementsByTagName("span")[0].innerText = `${puntiGiocatore}`;
    puntiBanco = 0;
    document.getElementsByTagName("span")[1].innerText = `${puntiBanco}`;

    // Inizializzo le fish a opacity 0.5
    let id = document.getElementById("puntata");
    for (let div of id.children) {
        div.style.opacity = 0.5;
    }

    // Sul mouse over delle card che sono da girare assegno opacity 1
    mazzoG.addEventListener("mouseover", mouseOver);
    mazzoB.addEventListener("mouseover", mouseOver);

    // Sul mouse out delle card che sono da girare assegno opacity 0.5
    mazzoG.addEventListener("mouseout", mouseOut);
    mazzoB.addEventListener("mouseout", mouseOut);

    // Sul muose click della card del giocatore assegno una funzione 
    mazzoG.addEventListener("click", mazzoGClicked);

    // Sul muose click della card del banco assegno una funzione 
    mazzoB.addEventListener("click", mazzoBClicked);

    // Sul mouse over delle fish assegno opacity 1
    for (let div of id.children) {
        div.addEventListener("mouseover", mouseOver);
    }

    // Sul mouse out delle fish assegno opacity 0.5
    for (let div of id.children) {
        div.addEventListener("mouseout", mouseOut);
    }

    // Sul click delle fish assegno una funzione
    for (let div of id.children) {
        div.addEventListener("click", fishClicked);
    }

    // Azzero le variabili per il conteggio di soldi puntati e posizioni libere
    posLiberaCartaG = 0;
    posLiberaCartaB = 0;
    soldiPuntati = 0;
    posLiberaFishPuntate = 0;

    // Azzero fishPuntate, CarteG e carteB
    for (let i = 0; i < 12; i++) {
        fishPuntate[i] = "";
        carteG[i] = "";
        carteB[i] = "";
    }
}