function genera() {

    //Dichiaro l'array e ricavo i lanci
    let faccia = [0, 0, 0, 0, 0, 0];
    let lanci = parseInt(document.getElementById("txtLanci").value);

    //Controllo che lanci sia un numero valido
    if (isNaN(lanci) || lanci <= 0) {
        alert("Inserisci un numero di lanci valido.");
        return;
    }

    //Calcolo la frequenza
    for (let i = 0; i < lanci; i++) {
        let num = Math.floor(Math.random() * (7 - 1)) + 1;
        faccia[num - 1]++;
    }

    //Scrivo il messaggio
    let text = document.getElementsByName("msg");
    for (let i = 0; i < faccia.length; i++) {
        text[i].innerText = "La faccia (" + (i + 1) + ") è uscito " + faccia[i] + " volte.";

        //Assegno i colori
        let colore = Math.floor(Math.random() * (11 - 1)) + 1;
        switch (colore) {
            case 1:
                text[i].style.color = "red";
                break;
            case 2:
                text[i].style.color = "blue";
                break;
            case 3:
                text[i].style.color = "salmon";
                break;
            case 4:
                text[i].style.color = "gray";
                break;
            case 5:
                text[i].style.color = "orange";
                break;
            case 6:
                text[i].style.color = "green";
                break;
            case 7:
                text[i].style.color = "magenta";
                break;
            case 8:
                text[i].style.color = "light blue";
                break;
            case 9:
                text[i].style.color = "lime";
                break;
            case 10:
                text[i].style.color = "brown";
                break;
        }
    }
}