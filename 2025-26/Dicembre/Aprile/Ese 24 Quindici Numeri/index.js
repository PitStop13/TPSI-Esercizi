const DIM = 4;
let struttura = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

window.addEventListener("load", function () {
    const wrapper = document.getElementById("wrapper");

    wrapper.style.width = (40 * DIM) + (2 * (DIM - 1));
    for (let i = 0; i < (DIM * DIM); i++) {
        let div = document.createElement("div");
        div.classList.add("cell");
        div.addEventListener("click", cellClick);
        wrapper.appendChild(div);
        let presente;
        let num;
        do {
            num = generaNumero(1, 16);
            let j = 0;
            presente = false;
            do {
                if (num == struttura[j]) {
                    presente = true;
                }
                j++;
            } while (j <= i && !presente);
        } while (presente);

        struttura[i] = num;

        if (num != 16) {
            const cell = document.getElementsByClassName("cell")[i];
            cell.style.backgroundColor = "blue";
            cell.innerText = num;
        }
    }

});

function generaNumero(a, b) {
    // Genero un numero random tra a e b, con a incluso e b escluso
    return Math.floor(Math.random() * b) + a;
}

function cellClick() {
    let pos;
    for (let i = 0; i < (DIM * DIM); i++) {
        if (parseInt(this.innerText) == struttura[i]) {
            pos = i;
        }
    }

    const cell = document.getElementsByClassName("cell");

    if (struttura[pos] == 16) {
        alert("La cella è vuota, non la puoi spostare!!");
        return;
    }

    let celleVuoteVicine = 4;
    if (pos - 4 >= 0) {
        if (struttura[pos - 4] == 16) {
            let aus = struttura[pos];
            struttura[pos] = struttura[pos - 4];
            struttura[pos - 4] = aus;
            cell[pos - 4].innerText = struttura[pos - 4];
            cell[pos - 4].style.backgroundColor = "blue";
            cell[pos].style.backgroundColor = "#CCC";
            cell[pos].innerText = "";
        }
        else {
            celleVuoteVicine--;
        }
    }

    if ((pos + 4) < (DIM * DIM)) {
        if (struttura[pos + 4] == 16) {
            let aus = struttura[pos];
            struttura[pos] = struttura[pos + 4];
            struttura[pos + 4] = aus;
            cell[pos + 4].innerText = struttura[pos + 4];
            cell[pos + 4].style.backgroundColor = "blue";
            cell[pos].style.backgroundColor = "#CCC";
            cell[pos].innerText = "";
        }
        else {
            celleVuoteVicine--;
        }
    }

    if (pos + 1 < 4 || pos + 1 < 8 || pos + 1 < 12 || pos + 1 < 16) {
        if (struttura[pos + 1] == 16) {
            let aus = struttura[pos];
            struttura[pos] = struttura[pos + 1];
            struttura[pos + 1] = aus;
            cell[pos + 1].innerText = struttura[pos + 1];
            cell[pos + 1].style.backgroundColor = "blue";
            cell[pos].style.backgroundColor = "#CCC";
            cell[pos].innerText = "";
        }
        else {
            celleVuoteVicine--;
        }
    }

    if (pos - 1 >= 0 || pos - 1 >= 4 || pos - 1 >= 8 || pos - 1 >= 12) {
        if (struttura[pos - 1] == 16) {
            let aus = struttura[pos];
            struttura[pos] = struttura[pos - 1];
            struttura[pos - 1] = aus;
            cell[pos - 1].innerText = struttura[pos - 1];
            cell[pos - 1].style.backgroundColor = "blue";
            cell[pos].style.backgroundColor = "#CCC";
            cell[pos].innerText = "";
        }
        else {
            celleVuoteVicine--;
        }
    }

    if (celleVuoteVicine == 0) {
        alert("La cella non ha celle vuote nelle vicinanze!!");
        return;
    }

    let vinto = true;
    let perso = true;
    let i = 0;
    while (i < (DIM * DIM) && vinto) {
        if ((struttura[i] != i + 1)) {
            vinto = false;
        }
        if (i == 11) {
            if (!vinto) {
                perso = false;
            }
        }
        i++;
    }

    if (vinto) {
        alert("Hai vinto!");
        const cell = document.getElementsByClassName("cell");
        for (let i = 0; i < (DIM * DIM); i++) {
            cell[i].removeEventListener("click", cellClick);
        }
        document.getElementById("risultato").innerText = "Hai vinto!!";
        return;
    }

    if (perso) {
        if (struttura[12] == 13 && struttura[13] == 15 && struttura[14] == 14) {
            alert("Non puoi viencere in nessun modo!");
            const cell = document.getElementsByClassName("cell");
            for (let i = 0; i < (DIM * DIM); i++) {
                cell[i].removeEventListener("click", cellClick);
            }
            document.getElementById("risultato").innerText = "Hai perso!!";
            return;
        }
    }
}