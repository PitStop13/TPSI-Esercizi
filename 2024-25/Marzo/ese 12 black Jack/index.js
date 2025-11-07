// Punteggio banco
let punteggioUtente = 0;

// Punteggio giocatore
let punteggioBanco = 0;

window.addEventListener("load", function () {
    // Aggiungo una carta al banco
    let numBanco = Math.floor(Math.random() * 10) + 1;
    punteggioBanco += numBanco;

    // Aggiungo il click su btnBanco
    document.getElementById("txtBanco").value = punteggioBanco;
    document.getElementById("btnBanco").addEventListener("click", clickBtnBanco)
});

function visualizza(index) {
    // Disabilito la chk selezionata
    const chkNum = document.getElementsByName("chkNum");
    chkNum[index].disabled = true;

    // Aggiungo il valore della carta al txt sopra la chk selezionata
    let numUtente = Math.floor(Math.random() * 10) + 1;
    const txtNum = document.getElementsByName("txtNum");
    txtNum[index].value = numUtente;

    // Aggiorno il punteggio dell'utente aggiungendo al punteggio il valore della nuova carta
    const txtUser = document.getElementById("txtUser");
    punteggioUtente += numUtente;
    txtUser.value = punteggioUtente;

    // Se il punteggio è maggiore di 21 ho perso
    if(punteggioUtente > 21)
    {
        alert("Hai perso!!!!");

        // Disabilito i chk e il btnBanco
        for (const checkBox of chkNum) {
            checkBox.disabled = true;
        }
        document.getElementById("btnBanco").disabled = true;
    }
}

function clickBtnBanco(){

    // Aggiungo al punteggio del banco il valore della nuova carta
    const txtBanco = document.getElementById("txtBanco");
    let numBanco = Math.floor(Math.random() * 10) + 1;
    punteggioBanco += numBanco;
    txtBanco.value = punteggioBanco;

    // Disabilito tutte le chk
    const chkNum = document.getElementsByName("chkNum");
    for (const checkBox of chkNum) {
        checkBox.disabled = true;
    }

    // Se il punteggio del banco è maggiore di 21 l'utente ha vinto
    if(punteggioBanco > 21)
    {
        alert("Hai vinto!!!!");

        // Disabilito il btnBanco
        this.disabled = true;
    } // Se il punteggio del banco è compreso tra 17 e 21 inclusi
    else if(punteggioBanco >= 17){

        // Se il punteggio del banco è maggiore o uguale a quello dell'utente l'utente ha perso altrimenti ha vinto
        if(punteggioBanco >= punteggioUtente){
            alert("Hai perso!!!!");
            // Disabilito il btnBanco
            this.disabled = true;
        }
        else{
            alert("Hai vinto!!!!");
            // Disabilito il btnBanco
            this.disabled = true;
        } 
    }
}