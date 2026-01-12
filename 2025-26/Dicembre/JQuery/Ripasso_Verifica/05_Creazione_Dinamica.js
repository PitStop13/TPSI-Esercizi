/* 
   -----------------------------------------------------------------------------------
   05_Creazione_Dinamica.js
   Creare elementi al volo e inserirli nel DOM.
   -----------------------------------------------------------------------------------
*/

// 1. CREAZIONE ELEMENTI
// -------------------------------------------------------------
// Sintassi: $("<tag>")...
let nuovoDiv = $("<div>");
let nuovoBtn = $("<button>").text("Cliccami").prop("id", "btnNew");
let nuovaImg = $("<img>").prop("src", "img/foto.png"); (Esercitazione1)

// Creazione con stringa HTML completa (utile per strutture complesse) (Esercitazione4)
let card = $(`
    <div class="col-3">
        <div class="card">...</div>
    </div>
`);

// 2. INSERIMENTO (Append, Prepend, Before, After) (Es_Dinamico)
// -------------------------------------------------------------
// Dentro il contenitore:
$("#contenitore").append(nuovoDiv);  // Mette in fondo
$("#contenitore").prepend(nuovoDiv); // Mette all'inizio

// Fuori dal contenitore (fratelli):
$("#elemento").before(nuovoDiv);     // Mette PRIMA dell'elemento
$("#elemento").after(nuovoDiv);      // Mette DOPO l'elemento

// Inversione soggetto/oggetto:
nuovoDiv.appendTo("#contenitore");

// 3. CLONARE
// -------------------------------------------------------------
let clone = $("#originale").clone();
$("#altroPosto").append(clone);

// 4. RIMOZIONE
// -------------------------------------------------------------
$("#elemento").remove();  // Rimuove l'elemento dal DOM (Esercitazione3)
$("#contenitore").empty(); // Rimuove tutti i FIGLI ma tiene il contenitore

// 5. LOOP SU ELEMENTI
// -------------------------------------------------------------
// .each() è fondamentale per iterare su liste o collezioni
$("li").each(function (index, element) {
    // index: 0, 1, 2...
    // element: oggetto DOM nativo (non jQuery)

    // Per usare funzioni jQuery su element, avvolgilo in $()
    $(element).css("color", "red");

    console.log("Elemento n." + index + " contiene: " + $(element).text());
});
