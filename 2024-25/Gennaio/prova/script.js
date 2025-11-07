window.onload = gestisciOnLoad

function gestisciOnLoad(){
    // Alert
    alert("Ciao belli");

    // Prompt
    const val = prompt("Inserisci il tuo nome");
    alert("Ciao" + val + " !");

    // Confirm
    const ok = confirm("Vuoi andare su Google?");
    if (ok) {
        open("https://www.google.it");
    }
    else {
        alert("Bravo rimani qui");
    }
};

