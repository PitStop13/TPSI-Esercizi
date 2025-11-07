// initialize global variables here
// ...
let primoNumero;
let operazioneCorrente;
let displayDaResettare;

window.addEventListener("load", function () {
  // do something when page loads for the first time

  // reset iniziale
  reset();

  // Recupero tutti i bottoni con classe number
  const numberButtons = document.getElementsByClassName("number");
  for (const btn of numberButtons) {
    btn.addEventListener("click", aggiungiCifraDisplay);
  }

  // Recupero tutti i bottoni con classe operation
  const operationButtons = document.querySelectorAll(".operation");
  for (const btn of operationButtons) {
    btn.addEventListener("click", setOperzione);
  }
});

// Aggiunge il numero inserito al display
function aggiungiCifraDisplay() {
  // Recupero il riferimento al txt-display
  const txtDisplay = document.getElementById("txt-display");

  // Se sono in situazione iniziale e premo un numero devo far sparire lo zero
  if (txtDisplay.value == "0" || displayDaResettare) {
    txtDisplay.value = "";
    displayDaResettare = false;
  }

  // Controllo se è già èersente un . nel txt-display
  const puntoDecPresente = txtDisplay.value.includes(".");

  // inserisco il carattere solo se non ho premuto il punto e il punto non è ancora presente nel txt-display
  if (this.textContent != "." || !puntoDecPresente) {
    // Se il display è vuoto e inserisco un punto devo mostrare "0." non solo "."
    if (txtDisplay.value == "" && this.innerText == ".") {
      txtDisplay.value = "0.";
    }
    else {
      txtDisplay.value += this.innerText;
    }
  }
}

function reset() {
  primoNumero = 0;
  operazioneCorrente = null;
  displayDaResettare = false;

  // Recupero il riferimento al txt-display e gli assegno value 0
  const txtDisplay = document.getElementById("txt-display");
  txtDisplay.value = "0";
}

// Gestisce la scelta di un operzione
function setOperzione() {
  // Recupero il riferimento al txt-display
  const txtDisplay = document.getElementById("txt-display");

  if (txtDisplay.value != "") {
    switch (this.innerText) {
      case "+":
      case "-":
      case "/":
      case "*":
        primoNumero = parseFloat(txtDisplay.value);
        operazioneCorrente = this.innerText;
        displayDaResettare = true;
        break;
      case "=":
        calcolaRisultato();
        operazioneCorrente = null;
        break;
      case "C":
        reset();
        break;
      default:
        console.error("Operazione non valida: ", this.innerText);
    }
  }
}

function calcolaRisultato() {
  // Se provo a colcolare ma non ho definito l'operazione mi devo fermare
  if (operazioneCorrente == null) {
    console.error("Operazione non specificata");
    return;
  }

  // Recupero il riferimento al txt-display
  const txtDisplay = document.getElementById("txt-display");

  const secondoNumero = parseFloat(txtDisplay.value);

  let risultato;
  switch (operazioneCorrente) {
    case "+":
      risultato = primoNumero + secondoNumero;
      break;
    case "-":
      risultato = primoNumero - secondoNumero;
      break;
    case "/":
      risultato = primoNumero / secondoNumero;
      break;
    case "*":
      risultato = primoNumero * secondoNumero;
      break;
    default:
      console.error("Operazione non valida");
      break;
  }

  // Recupero il riferimento al txt-display e setto primoNumero a risultato
  txtDisplay.value = risultato;
  primoNumero = risultato;
}