"use strict";
let _selector;

$(document).ready(function () {
    _selector = $("fieldset");
    //alert(_selector.length);
    _selector = _selector.eq(0);
});

function visualizza(codice) {
    let msg = "";
    switch (codice) {
        case 1: //msg=_selector.children("label").eq(0).children("input").eq(0).val();
            msg = _selector.find("input[type=text]").first().val();
            break;
        /*
        case 2:
            msg=_selector.find("select").eq(0).val();
            break;*/
        /*
        case 2:
            msg=$("select:first-child").val();
            break;
         */
        case 2:
            msg = $("select:first-of-type").val();
            break;
        case 3:
            _selector.children("fieldset").first().find(":checkbox")
                .each(function (index, elem) {
                    msg += $(elem).val() + "\n";
                });
            break;
        case 4:
            _selector.children("fieldset").first().find(":checkbox:checked")
                .each(function (index, elem) {
                    msg += $(elem).val() + "\n";
                });
            break;
        case 5:
            _selector.find("input:checkbox[name=chk]").not(":checked")
                .each(function (index, elem) {
                    msg += $(elem).val() + "\n";
                });
            break;
        case 6:
            msg = $("input[type=radio]:checked").val();
            break;
        case 7:
            $(":radio:not(:checked)")
                .each(function (index, elem) {
                    msg += $(elem).val() + "\n";
                });
            break;
        /*case 7:
            msg=$("input[type=radio]").not(":checked").val();
            break;*/
        case 8:
            _selector.find("select").eq(1).children("option:selected")
                .each(function (index, elem) {
                    msg += $(elem).val() + "\n"
                })



    }
    alert(msg);
}


function imposta(codice) {
    switch (codice) {
        case 1: //textBox
            $("input[type=text]").val("Nuovo valore");
            //per gli input il val scrive mentre il text legge,ma per il resto delle cose funziona il contrario
            break;
        case 2://ListBox
            //_selector.find("select").eq(0).children("option[value=2]").prop("selected", true);
            _selector.find("select").eq(0).val(["2"]);
            break;
        case 3://CheckBox
            $(":checkbox").val(["opzione 2", "opzione 3"]); //lo tratto come se fosse un array di valori
            break;
        case 4://RadioButton
            $("input[type=radio]").val(["no"]); //lo tratto come se fosse un array di valori
            break;
        case 5://ListBox selezione multipla
            _selector.find("select").eq(1).val(["1", "2"]); //lo tratto come se fosse un array di valori
            break;

    }
}