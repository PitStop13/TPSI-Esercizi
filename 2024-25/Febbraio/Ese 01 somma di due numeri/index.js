function somma(){
    //Ricavo riferimenti ai campi di testo
    let t1 = document.getElementById("txtN1");
    let t2 = document.getElementById("txtN2");

    //Cerco di convertire in numero il contenuto dei campi in input
    let n1 = parseFloat(t1.value);
    let n2 = parseFloat(t2.value);

    //TO DO: controllo che siano effetivamente dei numeri
    if (isNaN(n1) || isNaN(n2)) {
        alert("Inserire valori numerici validi.");
        return;//ferma il codice
    }
    
    //Calcolo la somma
    let ris = n1 + n2;

    //Visualizzazioni
    document.getElementById("divRis").innerText = ris;
    document.getElementById("txtRis").value = ris;//value perchè c'è un imput
    alert(ris);
}