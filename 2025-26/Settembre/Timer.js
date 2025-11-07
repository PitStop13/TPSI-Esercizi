// Ripete ogni 500ms
let timer = setInterval(function() {
    // Codice che si ripete
}, 500);

// Ferma il timer
clearInterval(timer);

// Esegue UNA VOLTA dopo 1 secondo
setTimeout(function() {
    alert("È passato 1 secondo!");
}, 1000);
