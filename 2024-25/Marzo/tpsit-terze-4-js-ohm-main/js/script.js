let cifra1, cifra2, cifra3, moltiplicatore, tolleranza;

window.addEventListener("load", function () {
  /*//Aggiungo l'evento change a tutte le listbox
  document.getElementById("band-1").addEventListener("change", selectionChangeBand_1);
  document.getElementById("band-2").addEventListener("change", selectionChangeBand_2);
  document.getElementById("band-3").addEventListener("change", selectionChangeBand_3);
  document.getElementById("band-4").addEventListener("change", selectionChangeBand_4);
  document.getElementById("band-5").addEventListener("change", selectionChangeBand_5);

  // Setto i valori di default
  cifra1 = 0;
  cifra2 = 0;
  cifra3 = 0;
  moltiplicatore = 1;
  tolleranza = 1;*/

  const select = document.getElementsByTagName("select");
  for(const el of select){
    el.addEventListener("change", ChangeSelect)
  }
   // Aggiungo l'evento click al button: calculate-button
   document.getElementById("calculate-button").addEventListener("click", clickBtnCalculate);
});

function ChangeSelect(){
  clickBtnCalculate();
}

/*function selectionChangeBand_1(){
  // cifra1 assume il valore della selezione della listbox 1
  cifra1 = this.value;
}

function selectionChangeBand_2(){
  // cifra2 assume il valore della selezione della listbox 2
  cifra2 = this.value;
}

function selectionChangeBand_3(){
  // cifra3 assume il valore della selezione della listbox 3
  cifra3 = this.value;
}

function selectionChangeBand_4(){
  // moltiplicatore assume il valore della selezione della listbox 4
  moltiplicatore = this.value;
}

function selectionChangeBand_5(){
  // tolleranza assume il valore della selezione della listbox 5
  tolleranza = this.value;
}*/

function clickBtnCalculate(){

  cifra1 = document.getElementById("band-1").value;
  cifra2 = document.getElementById("band-2").value;
  cifra3 = document.getElementById("band-3").value;
  moltiplicatore = parseInt(document.getElementById("band-4").value);
  tolleranza = parseFloat(document.getElementById("band-5").value);

  // Assegno a risultato la concatenazione delle stringhe: cifra1, cifra2, cifra3 e le converto in un intero
  let risultato = parseInt(cifra1 + cifra2 + cifra3);

  // Moltiplico il risultato per 10 elevanto al moltiplicatore
  risultato *= Math.pow(10, moltiplicatore);

  // Assegno al valore del paragrafo result-text il risultato e la tolleranza
  document.getElementById("result-text").textContent = `${risultato} ohm - Tolleranza ${tolleranza}%`;
}