"use strict"

function visualizza(codice) {
    let msg = "";
    switch (codice) {
        case 1:
            //msg = selector.children("label").eq(0).children("input").eq(0).val();
            //oppure con il find: 
            msg = selector.find("input[type=text]").eq(0).val();
            break;
        case 2:
            msg = selector.find("select option:selected").eq(0).val();
            break;

    }
    alert(msg);
}
function imposta(codice) {
    let msg;
    switch (codice) {
        case 1:
            msg = "Campo di testo";
            break;
        case 2:
            msg = "Voce selezionata nel ListBox";
            break;
        default:
            msg = "Codice non valido";
    }
    alert(msg);
}

let selector;
$(document).ready(function () {
    selector = $("fieldset");
    selector = selector.eq(0);
    selector.find("input").eq(0).attr("value");
});