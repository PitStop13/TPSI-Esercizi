let vet = new Array(5);

for (let i = 0; i < 5; i++) {
    let rnd;
    let ok;
    do {
        rnd = Math.floor(Math.random() * 5) + 1;

        ok = true;
        for (let j = 0; j < vet.length; j++) {
            if (vet[j] == rnd) {
                ok = false;
                break;
            }
        }
    } while (!ok);
    vet[i] = rnd;
}

function invia() {
    const txtNum = document.getElementsByName("txtNum");
    const chkNum = document.getElementsByName("chkNum");
    for (let i = 0; i < 5; i++) 
    {
        const txt = txtNum[i];
        const chk = chkNum[i];
        if(parseInt(txt.value) == vet[i])
        {
            txt.style.backgroundColor = "green"
            chk.che
        }
    }

    let box = document.getElementsByName("chkNum");
    for (let i = 0; i < inputVet.length; i++) {
        document.getElementsByName("txtNum").disabled = true;
        if (inputVet[i] == secretVet[i]) {
            box[i].disabled = false;
            box[i].style.backgroundColor = "green";
        }
    }

    document.getElementById("btnInvia").disabled = true;
}