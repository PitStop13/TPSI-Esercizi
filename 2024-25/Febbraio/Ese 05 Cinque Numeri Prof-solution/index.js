let vet = new Array(5);
//let flag = [false, false, false, false, false];

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
    const txtNum = document.getElementsByName("txtNum");//Ritorna un vettore con tutti gli elementi che hanno lo stesso name
    const chkNum = document.getElementsByName("chkNum");
    let cont = 0;
    
    for (let i = 0; i < 5; i++) 
    {
        const txt = txtNum[i];
        const chk = chkNum[i];
        if(parseInt(txt.value) == vet[i])//parse int per convertire da stringa a intero
        {
            txt.style.backgroundColor = "green"
            chk.checked = true;
            txt.disabled = true;
            cont++;
        }
    }

    const btnInvia = document.getElementById("btnInvia")

    if(cont == 5)
    {
        btnInvia.disabled = true;
        alert("hai vinto");
    }

}