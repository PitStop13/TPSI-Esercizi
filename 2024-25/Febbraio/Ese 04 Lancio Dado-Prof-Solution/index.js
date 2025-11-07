function genera() {

    //Uhuale a document.getElementById("txtLanci");
    const txtLanci = document.querySelector("#txtLanci");

    const nLanci = parseInt(txtLanci.value);

    let cont = [0, 0, 0, 0, 0, 0];

    //Genero nlanci lanci del dado e conto cosa esce
    for(let i = 0; i < nLanci; i++)
    {
        const rnd = Math.floor(Math.random()*6) + 1;
        cont[rnd - 1]++;
    }

    //Accedo ai paragrafi di stampa
    const msg = document.getElementsByName("msg");

    //Stampa statistiche lanci
    for(i = 0; i < cont.length; i++)
    {
        msg[i].innerText = `${i+1}: ${cont[i]} volte`;//alt 96 per avere i ``

        //Componenti cromatiche rgb
        const r = Math.floor(Math.random() * 256);//rgb tra 0 e 255
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        //Cambio colore paragrafo
        msg[i].style.color = `rgb(${r},${g},${b})`;//modifica il colore in CSS
    }
}