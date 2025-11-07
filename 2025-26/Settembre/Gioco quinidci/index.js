const DIM = 4;
window.onload = function () {
    let wrapper = document.getElementById("wrapper");
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let div = document.createElement("div");
            div.id = "btn" + i + j;
            div.addEventListener("click", sposta); //sposta SENZA le tonde dato che altrimenti vuool dire che la chiami
            wrapper.appendChild(div);
        }

    }
    //devo capire meglio come
    let ref;
    for (let i = 1; i < 16; i++) {
        let x, y;
        do {
            x = Math.floor(DIM * Math.random()); //0-3
            y = Math.floor(DIM * Math.random()); //0-3
            ref = document.getElementById("btn" + x + y);
        } while (ref.innerText != "");
        ref.innerText = i;

    }
}

function sposta() {
    let btn = this;
    let x = parseInt(btn.id.substr(3, 1));
    let y = parseInt(btn.id.substr(4, 1));

    if (y > 0 && document.getElementById("btn" + x + (y - 1)).innerText == "") {
        swap(btn, document.getElementById("btn" + x + (y - 1)));
    }

    if (y < DIM - 1 && document.getElementById("btn" + x + (y + 1)).innerText == "") {
        swap(btn, document.getElementById("btn" + x + (y + 1)));
    }

    if (x > 0 && document.getElementById("btn" + (x-1) + y).innerText == "") {
        swap(btn, document.getElementById("btn" + (x-1) + y));
    }

    if (x < DIM -1 && document.getElementById("btn" + (x+1) + y).innerText == "") {
        swap(btn, document.getElementById("btn" + (x+1) + y));
    }
    let indice = 1;
    for(let righe = 0;righe<DIM;righe++){
        for(let colonne = 0;colonne<DIM;colonne++){
            let bottone = document.getElementById("btn" + righe + colonne);
            if(bottone.innerText!=indice){
                if(indice == 16 && bottone.innerText == ""){
                    alert("Hai vinto!")
                }
                return;

            }
            
            indice++
        }
    }
    
}

function swap(Pieno, Vuoto) {
    let tmp = Pieno.innerText;
    Pieno.innerText = Vuoto.innerText;
    Vuoto.innerText = tmp; //Scambio il contenuto tra le due celle adiacenti
    
}