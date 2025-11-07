"use strict";

let nomi =
	["Italia", "Lavagna", "Pizzeria", "Lasagne", "Spiedino", "Ananas", "Gnocchi",
		"Gorgonzola", "Broccoli", "Mango", "Biscotti", "Giornale", "Carabina",
		"Affettati", "Lungimirante", "Affaticato", "Effervescente", "Ambulante",
		"Ambulanza", "Ostetricia"];

//Inizializzo i punti a 100
let punti = 100;

//Inizializzo il contatore di caretteri indovinati a 0
let contChar = 0;

//Prendo una stringa random dal vettore parole
const strIndex = Math.floor(Math.random() * (nomi.length - 1)) + 1;
const str = nomi[strIndex].toLocaleUpperCase();

window.addEventListener("load", function () {
	//Assegno alla texbox punti la variabile punti
	document.getElementById("txtPunti").value = punti;

	//Assegno a tutte i textbox la proprietà readOnly
	const txtCar = document.getElementsByName("txtCar");
	//for (const txt of txtCar) txt.setAttribute('readonly', true); 
	for (const txt of txtCar) txt.readOnly = true;

	//Disabilito tutte le checkbox e gli tolgo il checked
	const chkRis = document.getElementsByName("chkRis");
	for (const chk of chkRis) {
		chk.disabled = true;
		chk.checked = false;
	}

	//Assegno a tutte le textbox, fino alla lunghexxa della parola, il carettere *
	for (let i = 0; i < str.length; i++) {
		txtCar[i].value = "*";
	}

	//Controlla se la textbox contiene una lettera
	const txtInput = document.querySelector("#txtIns");
	txtInput.addEventListener("input", invia);

	//Abilito il pulsante risposta
	const btnRisposta = document.querySelector("#btnRisposta").disabled = false;
});

function invia() {
	//Abilito il pulsante invia se la textbox contine una lettera, lo disabilito se la textbox non contiene una lettera

	if (this.value == "") {
		document.querySelector("#btnInvia").disabled = true;
	}
	else {
		document.querySelector("#btnInvia").disabled = false;
	}
}

function confronta() {
	const txtInput = document.querySelector("#txtIns");
	const txtCar = document.getElementsByName("txtCar");
	const chkRis = document.getElementsByName("chkRis");


	let trovato = false;

	//Scorro str
	for (let i = 0; i < str.length; i++) {
		//Controllo se il carattere di str nella posizione di i è uguale al carettere inserito in input
		if (txtInput.value.toLocaleUpperCase() == str[i]) {
			chkRis[i].checked = true;
			txtCar[i].value = txtInput.value.toLocaleUpperCase();
			trovato = true;
			contChar++;
		}
	}

	//Se ho trovatto tutte le lettere ho vinto
	if(contChar == str.length)
	{
		alert(`Hai vinto, la parola era ${str}`);

		//Disabilito il pulsante risposta
		document.querySelector("#btnRisposta").disabled = true;
		this.disabled = true;
		return;
	}
	
	//Diminuisco i punti di 5 e riassegno alla texbox punti la variabile punti
	if(!trovato)
	{
		punti += -5;
		document.getElementById("txtPunti").value = punti;
	}

	if (punti <= 0) {
		this.disabled = true;
		document.querySelector("#btnRisposta").disabled = true;
		return;
	}
}

function rispondi() {
	//Chiedo all'utente di inserire la risposta
	let risposta = prompt("Inserisci qui la tua risposta definitiva: ");

	//Se la risposta è nulla esco
	if (risposta == null) {
		return;
	}

	//Se la risposta è vuota stampo errore
	if(risposta.trim() == ""){//trim toglie gli spazi
		alert("Risposta non valida!");
		return;
	}

	//Converto la stringa risposta in caratteri tutti maiuscoli
	risposta = risposta.trim().toLocaleUpperCase();

	let cont = 0;
	//Finchè risposta è uguale a str e cont è minore della lunghezza di str aumento cont
	while (risposta[cont] == str[cont] && cont < str.length) {
		cont++;
	}

	//Se tutte le lettere sono uguali hai vinto
	if (cont == str.length) {
		alert(`Hai vinto, la parola era ${str}`);

		//Disabilito il pulsante risposta
		this.disabled = true;
		document.querySelector("#btnInvia").disabled = true;
		document.querySelector("#txtIns").disabled = true;

		return;
	}
	else {
		alert(`Riprova, la parola non era ${risposta}`);

		//Diminuisco i punti di 20 e riassegno alla texbox punti la variabile punti
		punti += -20;
		document.getElementById("txtPunti").value = punti;

		//Se i punti sono minori di 0 disabilito il pulsante risposta
		if (punti <= 0) {
			this.disabled = true;
		}
		return;
	}
}
