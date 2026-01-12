/* 
   -----------------------------------------------------------------------------------
   07_Logica_Avanzata.js
   Codice più complesso, logica giochi, sincronizzazione.
   -----------------------------------------------------------------------------------
*/

// 1. SINCRONIZZARE ANIMAZIONI ($.when) (Esercitazione2 - 15 Puzzle)
// -------------------------------------------------------------
// Esegue una funzione .done() solo quando DUE o più animazioni sono finite entrambe.
$.when(
    $("#div1").animate({ top: 100 }, 500),
    $("#div2").animate({ top: -100 }, 500)
).done(function () {
    console.log("Entrambe le animazioni finite. Ora scambio i valori.");
    // Logica di swap post-animazione
});

// 2. POSIZIONE ASSOLUTA (.position vs .offset)
// -------------------------------------------------------------
let pos = $("#elemento").position(); // Relativa al genitore
console.log("Top: " + pos.top + " Left: " + pos.left);

let off = $("#elemento").offset();   // Relativa al documento intero

// 3. ARRAY UTILS (Shuffle / Random) (Esercitazione4 - Memory)
// -------------------------------------------------------------
// Mescolare un array
let deck = [1, 2, 3, 4];
deck.sort(() => 0.5 - Math.random());

// Spread operator per duplicare array
let coppie = [...deck, ...deck];

// 4. NUMERI RANDOM
// -------------------------------------------------------------
// Random int tra 0 e max-1
let rnd = Math.floor(max * Math.random());
// Random colore RGB (Esercitazione3)
let r = Math.floor(Math.random() * 256);

// 5. STRING PARSING
// -------------------------------------------------------------
// Estrarre numeri da una stringa "rgb(10, 20, 30)"
let rgbVal = "rgb(10, 20, 30)";
let parts = rgbVal.replace("rgb(", "").replace(")", "").split(","); // ["10", " 20", " 30"]
let rSorgente = parseInt(parts[0].trim());

// Substr (Esercitazione2)
let id = "btn23";
let x = parseInt(id.substr(3, 1)); // prende il carattere a indice 3

// 6. TIMERS (setTimeout, setInterval)
// -------------------------------------------------------------
// SetTimeout: esegue una volta dopo X ms
let timer = setTimeout(function () {
    alert("Tempo scaduto!");
}, 1000);

// SetInterval: ripete ogni X ms
let timer2 = setInterval(() => {
    time++;
    $("#t").text(time);
}, 1000);

// Fermare il timer
clearTimeout(timer);
clearInterval(timer2);
