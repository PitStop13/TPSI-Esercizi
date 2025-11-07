let cont = 0;
let timerId = 0;

window.addEventListener("load", function(){
    const spanSecondi = document.getElementById("span-secondi");

    spanSecondi.textContent = "0";

    // Fa partire il timer e savla l'id nella variabile timerId
    timerId = setInterval(aggiornaConSecondi, 1000);

    const btnStop = document.getElementById("btn-stop");

    btnStop.addEventListener("click", btnStopClicked);

    const pDisclaimer = document.getElementById("p-disclaimer");

    pDisclaimer.style.display = "none";

    const btnMostraDisclaimer = document.getElementById("btn-mostra-disclaimer");

    btnMostraDisclaimer.addEventListener("click", btnMostraDisclaimerClicked);

});

function aggiornaConSecondi(){
    cont++;
    const spanSecondi = document.getElementById("span-secondi");
    spanSecondi.textContent = cont;
}

function btnStopClicked(){

    // Stoppa il timer
    clearInterval(timerId);
}

function btnMostraDisclaimerClicked(){
    // Mostra il paragrafo
    const pDisclaimer = document.getElementById("p-disclaimer");
    pDisclaimer.style.display = "inline-block";

    // Lancio un timer che fra 5 secondi richiamerà nascondiDisclaimer
    setTimeout(nascondiDisclaimer, 5000);
}

function nascondiDisclaimer(){
    // Nascondo disclaimer
    const pDisclaimer = document.getElementById("p-disclaimer");
    pDisclaimer.style.display = "none";
}