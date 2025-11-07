const nomi =
        ["Italia", "Lavagna", "Pizza", "Lasagne", "Spiedino", "Ananas", "Gnocchi", "Gorgonzola", "Broccoli", "Mango", "Biscotti", 
		 "Giornale", "Carabina", "Affettati", "Lungimirante", "Affaticato", "Effervescente", "Ambulante", "Ambulanza", "Ostetricia"];
const MAX_TENTATIVI=5;
let errori = 0;
let pos = -1;
let parolaSegreta;

window.addEventListener("load", function(){
	pos = Math.floor(Math.random()*nomi.length);
	parolaSegreta = nomi[pos].toUpperCase();

	let s = "*";
	document.getElementById("txtParola").value = s.repeat(parolaSegreta.length);

	/*let s = "";

	for(let i = 0; i < ParolaSegreta.length; i++){
		s += "*";
	}

	document.getElementById("txtParola").value = s;//carico in un botta sola*/
	document.getElementById("txtLettera").addEventListener("input", inputTxtLettera);
	document.getElementById("btnInvia").addEventListener("click", clickBtnInvia)
});

function inputTxtLettera(){
	this.value = this.value.toUpperCase();
}

function clickBtnInvia(){
	let s = "";

	let val = document.getElementById("txtLettera").value;
	const txtParola = document.getElementById("txtParola");
	let trovato = false;
	let cont = 0;

	for(let i = 0; i < parolaSegreta.length; i++){
		if(parolaSegreta[i] == val){
			s+= parolaSegreta[i];
			cont++;
			trovato = true;
		}
		else if(txtParola.value[i] != "*")
		{
			s+= parolaSegreta[i];
			cont++;
		}
		else{
			s+= "*";
		}
	}
	document.getElementById("txtParola").value = s;
	
	if (!trovato){
		errori++;
		const imgImpiccato = document.getElementById("imgImpiccato");
		imgImpiccato.src = `img/Fig${errori}.png`;
	}

	if(errori == 5)
	{
		alert("Hai perso!!!");
		this.disabled = true;
		document.getElementById("txtLettera").value = "";
		document.getElementById("txtLettera").disabled = true;
	}

	if(cont == parolaSegreta.length)
	{
		alert("Hai vinto!!!");
		this.disabled = true;
		document.getElementById("txtLettera").value = "";
		document.getElementById("txtLettera").disabled = true;
	}
}