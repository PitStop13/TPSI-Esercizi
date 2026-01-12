/* 
   -----------------------------------------------------------------------------------
   02_Manipolazione_DOM.js
   Modificare contenuto, stile, classi e attributi.
   -----------------------------------------------------------------------------------
*/

// 1. CONTENUTO (Text, HTML, Val)
// -------------------------------------------------------------
// Leggere e Scrivere testo
let testo = $("#output").text();       // Legge
$("#output").text("Nuovo Testo");      // Scrive (Es_Selettori)

// Leggere e Scrivere HTML (include tag)
// $("#contenitore").html("<b>Grassetto</b>");

// Leggere e Scrivere Valori (Input form)
let valoreInput = $("input").val();    // Legge
$("input").val("Nuovo Valore");        // Scrive

// 2. CLASSI CSS (Add, Remove, Toggle)
// -------------------------------------------------------------
$("#box").addClass("evidenziato");     // Aggiunge classe (Es_Selettori)
$("#box").removeClass("accesa");       // Rimuove classe (Es_Lampadina)
$("#box").toggleClass("attivo");       // Mette se non c'è, toglie se c'è
let haClasse = $("#box").hasClass("flipped"); // Restituisce true/false (Esercitazione4)

// 3. STILI CSS (.css)
// -------------------------------------------------------------
// Singola proprietà
$("#elemento").css("color", "red");
$("#elemento").css("visibility", "hidden"); // O "visible" (Es_Goal)

// Proprietà multiple (Oggetto JSON) (Es_Lampadina, Esercitazione3)
$("#elemento").css({
    "backgroundColor": "#ffd",
    "width": "600px",
    "border": "1px solid black",
    "opacity": "0.5"
});

// Leggere un valore CSS
let coloreAttuale = $("#elemento").css("background-color"); // Restituisce rgb(...)

// 4. ATTRIBUTI E PROPRIETÀ (.attr, .prop, .data)
// -------------------------------------------------------------
// Prop (preferibile per proprietà DOM come checked, disabled, src, id)
$("#img").prop("src", "img/foto.jpg");        // Cambia SRC (Es_Visualizzatore_Immagini)
$("#btn").prop("disabled", true);             // Disabilita bottone
$("#chk").prop("checked", true);              // Seleziona checkbox

// Attr (attributi HTML standard)
$("img").attr("src", "img/retro.jpg");

// Data attributes (data-*) (Esercitazione4 - Memory)
// HTML: <div data-img="img1.png">
let immagineAssociata = $(".card").data("img");

// Rimuovere attributi
$(".box").removeAttr("title");
