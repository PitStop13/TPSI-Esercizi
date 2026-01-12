/* 
   -----------------------------------------------------------------------------------
   01_Selettori_Base.js
   Raccolta di esempi sui selettori jQuery tratti dai tuoi esercizi.
   -----------------------------------------------------------------------------------
*/

// 1. SELETTORI FONDAMENTALI (ID, CLASSE, TAG)
// -------------------------------------------------------------
let elementoById = $("#btnSpegni");    // Seleziona per ID (singolo elemento)
let elementiByClass = $(".box");       // Seleziona per Classe (può essere multiplo)
let elementiByTag = $("p");            // Seleziona tutti i paragrafi <p>
let body = $("body");

// 2. SELETTORI GERARCHICI E FILTRI
// -------------------------------------------------------------
// Seleziona figli diretti 'li' dentro '#wrapper'
let figliDiretti = $("#wrapper").children("li");

// Cerca discendenti 'input' di tipo text dentro un fieldset (anche annidati in profondità)
let inputText = $("fieldset").find("input[type=text]");

// Pseudo-selettori :first, :last, :eq()
let primoP = $("p").first();           // Primo paragrafo
let ultimoBox = $(".box").last();      // Ultimo elemento con classe .box
let terzoElemento = $("li").eq(2);     // Terzo elemento (indice parte da 0)

// Filtri pari/dispari (utile per tabelle o liste) (Es_Scasione_Elementi)
let elementiPari = $("li").filter(":nth-child(even)"); // Elementi pari
let elementiDispari = $("li").filter(":nth-child(odd)"); // Elementi dispari

// Slice: tagliare una selezione (da indice X a Y) (Es_Scasione_Elementi)
// Prende elementi dall'indice 1 all'indice 7 escluso
let fetta = $("#wrapper").children("li").slice(1, 7);

// 3. CONTEGGIO E CONTROLLI
// -------------------------------------------------------------
let numeroElementi = $("div").length;  // Restituisce il numero di elementi trovati
// alert("Trovati " + numeroElementi + " div");

// 4. THIS (riferimento all'elemento corrente dentro un evento)
// -------------------------------------------------------------
$("button").click(function () {
    let btnCliccato = $(this); // $(this) trasforma l'oggetto DOM in oggetto jQuery
    // ...
});
