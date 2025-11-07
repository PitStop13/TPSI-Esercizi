window.onload = function () //si può usare al posto di defer
{
    //Selezione elemento per id
    //document.getElementById("titolo-principale").innerText = "Nuovo valore";
    let titoloPrincipale = document.getElementById("titolo-principale"); //inner text cambia il contenuto testuale all' interno del testo
    titoloPrincipale.textContent = "Nuovo valore";

    //Selezione elemnti per name
    let pragrafiIncr = document.getElementsByName("paragrafi-incr");//vettore che contine tot elemnti che si numero a seconda dell'ordine in cui sono nella pagina
    for (let i = 0; i < pragrafiIncr.length; i++) {
        pragrafiIncr[i].textContent = i + 1;
    }

    //Selezione elemnti per tag name
    let body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "lightgray";

    //Selzione elemnti per class name
    let colorato = document.getElementsByClassName("colorato");
    for (let i = 0; i < colorato.length; i++) {
        colorato[i].style.color = "green";
    }

    //Ricerca annidata
    let wrapper = document.getElementById("wrapper");
    let pWrapper = wrapper.getElementsByTagName("p");
    for (let i = 0; i < pWrapper.length; i++) {
        pWrapper[i].style.border = "2px dashed black"; //dashed è il bordo tratteggiato
        pWrapper[i].textContent = "Testo modificato";
    }

    // innerHTML
    let wrapperLista = document.getElementById("wrapper-lista");
    wrapperLista.innerHTML = "<ul><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 2</li></ul>";//genera degli oggetti
    wrapperLista.textContent = "<ul><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 2</li></ul>";//genera un testo
}


