/* 
   -----------------------------------------------------------------------------------
   06_Form_Controlli.js
   Gestione specifica di Input, Radio, Checkbox, Select.
   (Riferimento: ES_Form_e_Controlli)
   -----------------------------------------------------------------------------------
*/

/*
   NOTA IMPORTANTE:
   .val() si usa sui campi form (input, select, textarea).
   .text() o .html() si usa su elementi normali (div, p, span, label).
*/

// 1. INPUT TEXT
// -------------------------------------------------------------
let testoInserito = $("input[type=text]").val();
$("input[type=text]").val("Valore impostato da codice");

// 2. CHECKBOX
// -------------------------------------------------------------
// Vedere se è checkato:
let isChecked = $("#mioCheck").prop("checked"); // true/false
let isChecked2 = $("#mioCheck").is(":checked"); // true/false

// Selezionare/Deselezionare:
$("#mioCheck").prop("checked", true);

// Iterare su tutti i checkbox selezionati:
$(":checkbox:checked").each(function () {
    console.log($(this).val());
});

// Setting multiplo (passando un array di valori)
$(":checkbox").val(["opzione 2", "opzione 3"]);

// 3. RADIO BUTTONS
// -------------------------------------------------------------
// Leggere quello selezionato (ne prende uno solo per gruppo name)
let radioVal = $(":radio:checked").val();

// Selezionare un radio specifico
$("input[name=sesso][value=M]").prop("checked", true);

// 4. SELECT (Menu a tendina)
// -------------------------------------------------------------
// Leggere valore selezionato
let selezione = $("select").val(); // Ritorna value dell'option scelta

// Selezionare un'opzione
$("select").val("valore_da_selezionare");

// Select Multipla
// Ritorna un array di valori
let valMultipli = $("#selectMultipla").val();
// ["1", "3"]

// Impostare multipli
$("#selectMultipla").val(["1", "2"]);

// Trovare l'option selezionata per leggerne il testo (non il value)
let testoOption = $("select option:selected").text();
