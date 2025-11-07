"use strict"

const DIM=26;
let mat=[];






function random(min,max){
	return Math.floor((max-min)*Math.random()+min);
}

window.addEventListener("load", function(){

	document.getElementById("txt1").addEventListener("input", txt1Input);
	let btnScrambler = document.getElementById("btnScrambler")
	let btnDescrambler = document.getElementById("btnDescrambler");
	btnScrambler.addEventListener("click", btnScramblerClicked);
	btnDescrambler.addEventListener("click", btnDescramblerClicked);
	btnScrambler.disabled = true;
	btnDescrambler.disabled = true;

	//Creo la matrice mat
	for(let i = 0; i < 2; i++){
		mat[i] = [26];
	}

	//Riempo la prima riga della matrice mat con i caratteri da A a Z in ordine alfabetico
	for(let i = 0; i < 26; i++){
		mat[0][i] = String.fromCharCode(i + 65);
		document.getElementById("div1").textContent += `${mat[0][i]}`;
	}
	

	//Riempo la prima riga della matrice mat con i caratteri da A a Z sparsi in modo random
	let char;
	for(let i = 0; i < 26; i++){
		do
		{
			char = String.fromCharCode(random(0, 26) + 65);
		}while(mat[1].includes(char));
		mat[1][i] = char;
		document.getElementById("div2").textContent += `${mat[1][i]}`;
	}
});

function txt1Input(){
	//Converto il valore dei caratteri che scrivo in maiuscoli
	const txt1 = document.getElementById("txt1");
	const txt2 = document.getElementById("txt2")
	if(txt1.value != ""){
		txt1.value = txt1.value.toUpperCase();
		document.getElementById("btnScrambler").disabled = false;
		document.getElementById("btnDescrambler").disabled = false;
		txt2.value = "";
	}
	else{
		document.getElementById("btnScrambler").disabled = true;
		document.getElementById("btnDescrambler").disabled = true;
		txt2.value = "";
	}
}

function btnScramblerClicked(){
	const txt1 = document.getElementById("txt1");
	const txt2 = document.getElementById("txt2");
	txt2.value = "";
	for(let i = 0; i < txt1.value.length; i++){
		//mat[0].indexOf(txt1[i]) trova l'indice della matrice
		if(mat[0].includes(txt1.value[i])){
			let charCode = (txt1.value.charCodeAt(i) - 65);
			txt2.value += mat[1][charCode];
		}
		else{
			txt2.value += txt1.value[i];
		}
	}
}

function btnDescramblerClicked(){
	const txt1 = document.getElementById("txt1");
	const txt2 = document.getElementById("txt2");
	txt2.value = "";
	for(let i = 0; i < txt1.value.length; i++){
		if(mat[1].includes(txt1.value[i])){
			let pos = mat[1].indexOf(txt1.value[i]);
			txt2.value += mat[0][pos];
		}
		else{
			txt2.value += txt1.value[i];
		}
	}
}