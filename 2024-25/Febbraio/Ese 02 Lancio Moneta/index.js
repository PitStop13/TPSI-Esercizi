const lblCroce = document.getElementById("lblCroce");
const lblTesta= document.getElementById("lblTesta");

var txtBaseCroce = lblCroce.innerText;//var è una variabile globale
var txtBaseTesta = lblTesta.innerText;

function lanciaMoneta(){
    //Leggo il numero di lanci
    let nLanci = parseInt(document.getElementById("txtLanci").value);

    //Verifico se n è un numero
    if(isNaN(nLanci) || nLanci <= 0){
        alert("Inserisci un numero valido.");
        return;
    }

    //Calcolo quante volte esce testa e quante croce
    let testa = 0, croce = 0;

    for(let i = 0; i < nLanci; i++)
    {
        /*let number = Math.floor(Math.random()*(1 - 3)) + 3;
        if(number == 1){
            testa++;
        }
        else{
            croce++;
        }*/
        if (Math.random() < 0.5) {
            testa++;
        } else {
            croce++;
        }
    }

    //Stampo testa e croce
    lblCroce.innerText = txtBaseCroce + croce;
    lblTesta.innerText = txtBaseTesta + testa;
    /*document.getElementById("lblCroce").innerText = "N. di volte in cui è uscito croce: " + croce;
    document.getElementById("lblTesta").innerText = "N. di volte in cui è uscito testa: " + testa;*/

    //Coloro il testo
    if(testa == croce){
        //Se sono uguali coloro tutto di nero
        lblCroce.style.color = lblTesta.style.color = "black";
    }
    else{
        //coloro di verde il minore e di rosso il maggiore
        lblCroce.style.color = (croce<testa) ? "green" : "red";
        lblTesta.style.color = (testa<croce) ? "green" : "red";
    }
}