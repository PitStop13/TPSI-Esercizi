function controllaCelleAdiacenti(i, j) {
    // Sopra
    if(i > 0) {
        let btnSopra = document.getElementById("btn-" + (i-1) + "-" + j);
    }
    
    // Sotto
    if(i < DIM-1) {
        let btnSotto = document.getElementById("btn-" + (i+1) + "-" + j);
    }
    
    // Sinistra
    if(j > 0) {
        let btnSx = document.getElementById("btn-" + i + "-" + (j-1));
    }
    
    // Destra
    if(j < DIM-1) {
        let btnDx = document.getElementById("btn-" + i + "-" + (j+1));
    }
}
