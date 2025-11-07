"use strict"

const DIM = 4;
let punti = 0;

window.addEventListener("load", function () {
   CreaMatrice();

   InizializzaMatrice();

   document.addEventListener("keyup", GestioneTasti);
});

function CreaMatrice() {
   const wrapper = document.getElementById("wrapper");

   for (let i = 0; i < DIM; i++) {
      for (let j = 0; j < DIM; j++) {
         let cella = document.createElement("div");

         cella.id = `div-${i}-${j}`;
         cella.classList.add("cella");

         wrapper.appendChild(cella);
      }
   }
}

function InizializzaMatrice() {
   let cont = 0;

   while (cont < 2) {
      const riga = GeneraNumero(0, DIM);
      const colonna = GeneraNumero(0, DIM);

      const cellaSel = document.getElementById(`div-${riga}-${colonna}`);

      if (cellaSel.textContent == "") {
         cellaSel.textContent = "2";
         cont++;
      }
   }
}

function GestioneTasti(event) {
   const tasto = event.key;

   // Verifico quale tasto viene premuto, se non è valido non faccio nulla
   if (tasto == "ArrowRight") {
      MuoviDx();
   } else if (tasto == "ArrowLeft") {
      MuoviSx();
   } else if (tasto == "ArrowUp") {
      MuoviSu();
   } else if (tasto == "ArrowDown") {
      MuoviGiu();
   }

   // Genero un nuovo 2 solo se il tasto premuto è valido
   if (tasto == "ArrowRight" || tasto == "ArrowLeft" || tasto == "ArrowUp" || tasto == "ArrowDown") {
      let vuota = false;

      while (!vuota) {
         const riga = GeneraNumero(0, DIM);
         const colonna = GeneraNumero(0, DIM);

         const cellaSel = document.getElementById(`div-${riga}-${colonna}`);

         if (cellaSel.textContent == "") {
            cellaSel.textContent = "2";
            vuota = true;
         }
      }
   }
}

function MuoviDx() {
   // Eseguo la procedura di scorrimento 3 volte, come suggerito nella consegna
   for (let k = 0; k < 3; k++) {
      // Scorro la matrice da destra a sinistra, evitando la prima colonna
      // per non andare fuori dalla matrice
      for (let j = DIM - 1; j > 0; j--) {
         // Scorro le righe dalla prima all'ultima
         for (let i = 0; i < DIM; i++) {
            const cellaAtt = document.getElementById(`div-${i}-${j}`);
            const cellaSucc = document.getElementById(`div-${i}-${j - 1}`);

            ControlloCelle(cellaAtt, cellaSucc);
         }
      }
   }
}

function MuoviSx() {
   // Eseguo la procedura di scorrimento 3 volte, come suggerito nella consegna
   for (let k = 0; k < 3; k++) {
      // Scorro la matrice da sinistra a destra, evitando l'ultima colonna
      // per non andare fuori dalla matrice
      for (let j = 0; j < DIM - 1; j++) {
         // Scorro le righe dalla prima all'ultima
         for (let i = 0; i < DIM; i++) {
            const cellaAtt = document.getElementById(`div-${i}-${j}`);
            const cellaSucc = document.getElementById(`div-${i}-${j + 1}`);

            ControlloCelle(cellaAtt, cellaSucc);
         }
      }
   }
}

function MuoviSu() {
   // Eseguo la procedura di scorrimento 3 volte, come suggerito nella consegna
   for (let k = 0; k < 3; k++) {
      // Scorro la matrice da sopra al fondo, evitando l'ultima riga
      // per non andare fuori dalla matrice
      for (let i = 0; i < DIM - 1; i++) {
         // Scorro le colonne dalla prima all'ultima
         for (let j = 0; j < DIM; j++) {
            const cellaAtt = document.getElementById(`div-${i}-${j}`);
            const cellaSucc = document.getElementById(`div-${i + 1}-${j}`);

            ControlloCelle(cellaAtt, cellaSucc);
         }
      }
   }
}

function MuoviGiu() {
   // Eseguo la procedura di scorrimento 3 volte, come suggerito nella consegna
   for (let k = 0; k < 3; k++) {
      // Scorro la matrice dal fondo a sopra, evitando la prima riga
      // per non andare fuori dalla matrice
      for (let i = DIM - 1; i > 0; i--) {
         // Scorro le colonne dalla prima all'ultima
         for (let j = 0; j < DIM; j++) {
            const cellaAtt = document.getElementById(`div-${i}-${j}`);
            const cellaSucc = document.getElementById(`div-${i - 1}-${j}`);

            ControlloCelle(cellaAtt, cellaSucc);
         }
      }
   }
}

function ControlloCelle(cellaAtt, cellaSucc) {
   // Se la cella attuale è vuota, la sostituisco con quella successiva
   if (cellaAtt.textContent == "") {
      cellaAtt.textContent = cellaSucc.textContent;
      cellaSucc.textContent = "";
   }

   // Se le celle sono uguali, le sommo nella cella attuale 
   // e la cella successiva diventa vuota
   else if (cellaAtt.textContent == cellaSucc.textContent) {
      cellaAtt.textContent = parseInt(cellaAtt.textContent) + parseInt(cellaSucc.textContent);
      cellaSucc.textContent = "";

      // Aggiorno il punteggio
      const spanPunti = document.querySelector("#punti span");
      punti += parseInt(cellaAtt.textContent);
      spanPunti.textContent = punti;
   }
}

// Funzione che genera un numero casuale tra min e max (max escluso)
function GeneraNumero(min, max) {
   return Math.floor((max - min) * Math.random()) + min;
}