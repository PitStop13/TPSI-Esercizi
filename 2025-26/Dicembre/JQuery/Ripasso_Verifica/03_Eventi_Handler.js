/* 
   -----------------------------------------------------------------------------------
   03_Eventi_Handler.js
   Gestione degli eventi (click, mouse, tastiera).
   -----------------------------------------------------------------------------------
*/

$(document).ready(function () {
    // Codice da eseguire quando la pagina è caricata
});

// 1. EVENTI STANDARD (Click, Mouse)
// -------------------------------------------------------------
// Click semplice
$("#btnAccendi").click(function () {
    // Codice...
});

// Mouse Over / Out (Es_Lampadina)
$("#descrizione").on("mouseover", function () {
    // Mouse sopra
});
$("#descrizione").on("mouseout", function () {
    // Mouse fuori
});

// Hover (scorciatoia per enter/leave) (Esercitazione3)
$(".box").hover(
    function () {
        // Callback IN (mouseenter)
        $(this).css("background-color", "yellow");
    },
    function () {
        // Callback OUT (mouseleave)
        $(this).css("background-color", "white");
    }
);

// 2. ON vs OFF
// -------------------------------------------------------------
// .on() è il metodo generico raccomandato.
$("#btn").on("click", function () { ... });

// .off() rimuove l'evento (utile per evitare doppi click o disabilitare interazioni)
$("#descrizione").off("mouseover"); // (Es_Lampadina)

// 3. GESTIONE EVENTI SU ELEMENTI DINAMICI
// -------------------------------------------------------------
// Se crei un elemento DOPO il caricamento pagina, il click semplice potrebbe non andare
// se non lo riassegni.
// Oppure si assegna l'evento direttamente alla creazione:
let nuovoDiv = $("<div>").click(function () { alert("Click!"); }); // (Esercitazione2)

// Oppure delega (su un contenitore padre che esiste sempre):
// $("#static-container").on("click", ".dynamic-child", function() { ... });

// 4. COORDINATE EVENTO
// -------------------------------------------------------------
$(document).click(function (event) {
    console.log("X: " + event.pageX + ", Y: " + event.pageY);
});
