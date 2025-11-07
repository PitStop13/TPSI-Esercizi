let numbers = new Array(3);

for (let i = 0; i < numbers.length; i++) {
    let num;
    do {
        num = Math.floor(Math.random() * 9) + 1;
    } while (numbers.includes(num));
    numbers[i] = num;
}

function controlla() {
    const txtN = document.getElementsByName("txtN");
    const chkN = document.getElementsByName("chkN");

    for(const chk of chkN)
    {
        chk.checked = false;
    }

    if(txtN[0].value == "" || txtN[1].value == "" || txtN[2].value == "")
    {
        alert("Non tutte le caselle di testo contengono un numero!!");
        return;
    }

    const txtNValues = [parseInt(txtN[0].value), parseInt(txtN[1].value), parseInt(txtN[2].value)];

    if( txtNValues[0] == txtNValues[1] || txtNValues[0] == txtNValues[2] || txtNValues[1] == txtNValues[2])
    {
        alert("Ci sono dei numeri ripetuti!!");
        return;
    }

    let cont = 0;

    for (let i = 0; i < numbers.length; i++) {
        //Se il vettore contiene il valore attuale aumento cont e spunto la checkbox
        if (numbers.includes(txtNValues[i])) {
            chkN[cont].checked = true;
            cont++;
        }
    }

    //const btnInvia = document.querySelector("#btnInvia");
    const btnInvia = document.getElementById("btnInvia");

    if (cont == numbers.length) {
        btnInvia.disabled = true;
        alert("Hai vinto!!");
        return;
    }
}