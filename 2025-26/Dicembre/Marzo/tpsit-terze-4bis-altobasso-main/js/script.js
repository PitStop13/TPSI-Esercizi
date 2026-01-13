"use strict";
let tentativi = 10;

window.addEventListener("load", function () {

    document.getElementById("txt-number").disabled = true;
    document.getElementById("btn-play").disabled = true;

    document.getElementById("btn-generate").addEventListener("click", btnGenerateClick);
    document.getElementById("btn-play").addEventListener("click", btnGiocaClick);
});

function generaNumero(a, b) {
    return Math.floor(Math.random() * (b - a)) + a;
}

function btnGenerateClick() {
    let secretNumber = generaNumero(1, 100);
    document.getElementById("txt-secret-number").value = secretNumber;
    let txtNumber = document.getElementById("txt-number");
    txtNumber.disabled = false;
    txtNumber.value = null;
    document.getElementById("btn-play").disabled = false;
    tentativi = 10;
    document.getElementById("p-attempts").innerText = `Tentativi rimasti: ${tentativi}`;
    document.getElementById("p-result").innerText = "";
}

function btnGiocaClick() {
    let txtNumber = document.getElementById("txt-number");
    let btnPlay = document.getElementById("btn-play");
    let txtSecretNumber = document.getElementById("txt-secret-number");
    let pAttemps = document.getElementById("p-attempts");
    let pResult = document.getElementById("p-result");


    if (txtNumber.value != NaN && txtNumber.value != "") {
        if (parseInt(txtNumber.value) >= 1 && parseInt(txtNumber.value) <= 100) {
            tentativi--;
            if (parseInt(txtNumber.value) == parseInt(txtSecretNumber.value)) {
                pResult.innerText = `Numero indovinato in ${10 - tentativi} tentativi!`;
                txtNumber.disabled = true;
                btnPlay.disabled = true;
                pAttemps.innerText = `Tentativi rimasti: ${tentativi}`;
                return;
            }
            else {
                if (parseInt(txtNumber.value) > parseInt(txtSecretNumber.value)) {
                    pResult.innerText = "Alto";
                }
                else {
                    pResult.innerText = "Basso";
                }
            }
            if (tentativi == 0) {
                pResult.innerText = "Hai perso!";
                txtNumber.disabled = true;
                btnPlay.disabled = true;
            }
            pAttemps.innerText = `Tentativi rimasti: ${tentativi}`;
        }
        else {
            pResult.innerText = "Inserisci un numero compreso fra 1 e 100";
        }
    }
    else {
        pResult.innerText = "Inserisci un numero";
    }

}