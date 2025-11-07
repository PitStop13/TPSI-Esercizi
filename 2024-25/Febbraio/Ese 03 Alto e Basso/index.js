//Inizializzo tentaivi e number che non devono mai cambiare
var tentativi = 0;
const number = Math.floor(Math.random() * (101 - 1)) + 1;

function gioca() {
    //Ricavo il numero in input
    let txttentativi = document.getElementById("divTentativi");
    let inputNumber = parseInt(document.getElementById("txtNumero").value);
    let t = document.getElementById("divMessaggio");

    //Calcolo se il numero in input è valido
    if (isNaN(inputNumber) || inputNumber < 0) {
        alert("Inserisci un numero valido.");
        return;
    }

    //Mi chiedo se i tentativi sono minori di 10
    if (tentativi < 10) {
        if (inputNumber == number) {
            //Hai vinto
            t.innerHTML += "Hai vinto, il numero era: " + number;
            document.getElementById("btnGioca").disabled = true;
        }
        else {
            //Aumento i tentativi
            tentativi++;
            txttentativi.innerText = "Tentativi : " + tentativi;
            if (inputNumber < number) {
                //Il numbero è più alto
                t.innerHTML += "Il numero inserito (" + inputNumber + ") è troppo piccolo<br>";
            }
            else {
                //Il numero è più basso
                t.innerHTML += "Il numero inserito (" + inputNumber + ") è troppo grande<br>";
            }
        }
    }
    else {
        //hai perso
        t.innerHTML += "Hai perso, il numero era: " + number;
        document.getElementById("btnGioca").disabled = true;
    }
}