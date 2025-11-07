// Partendo dalla cella [i, j]

// 1. ALTO-SINISTRA ↖
let altoSx = document.getElementById("btn-" + (i-1) + "-" + (j-1));

// 2. ALTO-DESTRA ↗
let altoDx = document.getElementById("btn-" + (i-1) + "-" + (j+1));

// 3. BASSO-SINISTRA ↙
let bassoSx = document.getElementById("btn-" + (i+1) + "-" + (j-1));

// 4. BASSO-DESTRA ↘
let bassoDx = document.getElementById("btn-" + (i+1) + "-" + (j+1));
