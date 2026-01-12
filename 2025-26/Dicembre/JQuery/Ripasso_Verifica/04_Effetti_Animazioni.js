/* 
   -----------------------------------------------------------------------------------
   04_Effetti_Animazioni.js
   Effetti visivi e animazioni custom.
   -----------------------------------------------------------------------------------
*/

// 1. SHOW / HIDE / TOGGLE (Visibilità immediata)
// -------------------------------------------------------------
$("#elemento").show();       // Mostra
$("#elemento").hide();       // Nascondi
$("#elemento").toggle();     // Inverte stato

// 2. FADE (Dissolvenza) (Es_Goal, Es_Lampadina)
// -------------------------------------------------------------
$("#elemento").fadeIn(1000); // 1000ms = 1 secondo
$("#elemento").fadeOut(800);
$("#elemento").fadeToggle();

// Callback: funzione da eseguire DOPO la fine dell'animazione
$("#elemento").fadeOut(1000, function () {
    alert("Elemento sparito!");
    $("#altroBtn").show();
});

// 3. SLIDE (Scorrimento vert.) (Es_Lampadina)
// -------------------------------------------------------------
$("#pannello").slideDown(800); // Scende
$("#pannello").slideUp(800);   // Sale (nasconde)
$("#pannello").slideToggle();

// 4. ANIMATE (Animazioni Custom) (Es_Goal, Esercitazione1)
// -------------------------------------------------------------
// animate({ proprietàCSS: valore }, durata, easing, callback)
// NOTA: animate funziona solo su valori numerici (width, height, top, left, opacity).
// Non funziona su background-color (senza plugin esterni o jQuery UI).

$("#palla").animate({
    'left': '550px',
    'bottom': '300px',
    'width': '50px',
    'opacity': '0.5'
}, 1500);

// Animazioni sequenziali (concatenazione) (Es_Logo_Vallauri_Effetto)
$(".box").animate({ "opacity": "0.3" }, 400)
    .animate({ "opacity": "0.6" }, 400);

// 5. STOP E FINISH
// -------------------------------------------------------------
// .stop() ferma l'animazione corrente
// .stop(clearQueue, jumpToEnd) -> solitamente .stop(true, true)
// Utile per evitare che le animazioni si "accumulino" se passi il mouse velocemente.

$(".box").stop(true, true).fadeIn(); // (Esercitazione1)
$(".box").finish().slideDown();      // (Esercitazione3) .finish() porta subito alla fine e pulisce coda
