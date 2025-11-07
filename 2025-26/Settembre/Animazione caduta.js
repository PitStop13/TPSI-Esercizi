let colonna = 5; // colonna fissa
let riga = 0; // parte dall'alto

function cadiQuadrato() {
    // Cancella posizione vecchia
    if(riga > 0) {
        let vecchio = document.getElementById("btn-" + (riga-1) + "-" + colonna);
        vecchio.style.backgroundColor = "gray";
    }
    
    // Disegna nuova posizione
    let nuovo = document.getElementById("btn-" + riga + "-" + colonna);
    nuovo.style.backgroundColor = "red";
    
    riga++;
    
    // Se arriva in fondo
    if(riga >= DIM) {
        riga = 0; // ricomincia
        colonna = Math.floor(Math.random() * DIM); // nuova colonna
    }
}

setInterval(cadiQuadrato, 500);
