function trovaCelleVuote() {
    let vuote = [];
    
    for(let i = 0; i < DIM; i++) {
        for(let j = 0; j < DIM; j++) {
            let btn = document.getElementById("btn-" + i + "-" + j);
            if(btn.style.backgroundColor == "" || btn.style.backgroundColor == "gray") {
                vuote.push({riga: i, colonna: j});
            }
        }
    }
    
    return vuote;
}

// Usa così
let celle = trovaCelleVuote();
if(celle.length > 0) {
    let casuale = celle[Math.floor(Math.random() * celle.length)];
    let btn = document.getElementById("btn-" + casuale.riga + "-" + casuale.colonna);
    btn.style.backgroundColor = "blue";
}
