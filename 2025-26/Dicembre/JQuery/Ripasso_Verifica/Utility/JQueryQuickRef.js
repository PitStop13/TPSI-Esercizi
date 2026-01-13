/**
 * JQUERY QUICK REFERENCE - SNIPPETS UTILI PER VERIFICA
 */

$(document).ready(function () {

    // --- 1. GENERAZIONE NUMERI CASUALI ---
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // --- 2. GESTIONE ARRAY / SHUFFLE (Mescolare elementi) ---
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // --- 3. SELETTORI POTENTI ---
    // Seleziona elementi che CONTENGONO un certo testo
    const $hasText = $("div:contains('Ricerca')");

    // Seleziona elementi PARI e DISPARI
    const $pari = $("tr:even"); // Indici 0, 2, 4...
    const $dispari = $("tr:odd"); // Indici 1, 3, 5...

    // --- 4. MANIPOLAZIONE CLASSI ---
    // Aggiungi, rimuovi o scambia
    $("#mioElemento").addClass("attivo");
    $("#mioElemento").removeClass("inattivo");
    $("#mioElemento").toggleClass("selezionato"); // Se c'è lo toglie, se non c'è lo mette

    // Controlla se ha una classe
    if ($("#mioElemento").hasClass("attivo")) {
        console.log("È attivo!");
    }

    // --- 5. EVENT DELEGATION (Fondamentale per elementi creati dopo il caricamento) ---
    // Invece di $(".cella").click(...), usa:
    $(document).on("click", ".cella-dinamica", function () {
        // $(this) si riferisce alla cella cliccata, anche se creata dopo il caricamento
        const valore = $(this).text();
        console.log("Valore cliccato: " + valore);
    });

    // --- 6. GESTIONE INPUT E FORM ---
    $("#mioBottone").on("click", function () {
        const nome = $("#txtNome").val(); // Prende il valore
        const isChecked = $("#chkAccetto").is(":checked"); // Booleano

        if (nome === "") {
            alert("Inserisci un nome!");
        }
    });

    // --- 7. EFFETTI DI TRANSIZIONE ---
    $("#box").fadeIn(500); // Appare gradualmente
    $("#box").fadeOut(500); // Scompare gradualmente
    $("#box").slideUp();     // Scorre verso l'alto
    $("#box").slideDown();   // Scorre verso il basso
    $("#box").toggle();      // Mostra/Nascondi istantaneo

    // --- 8. CICLARE SU ELEMENTI JQUERY ---
    $(".voci-lista").each(function (index) {
        console.log("Voce n. " + index + " ha testo: " + $(this).text());
        if (index === 2) {
            $(this).css("color", "red");
        }
    });

    // --- 9. CREAZIONE DINAMICA CON DATI ---
    const dati = ["Mela", "Pera", "Banana"];
    const $ul = $("<ul></ul>");
    dati.forEach(frutto => {
        $ul.append(`<li>${frutto} <button class='btn-del'>X</button></li>`);
    });
    $("body").append($ul);

    // --- 10. ELIMINAZIONE DINAMICA ---
    $(document).on("click", ".btn-del", function () {
        $(this).parent().remove(); // Rimuove il <li> genitore del bottone
    });

    // --- 11. TROVARE ELEMENTI RELATIVI ---
    // .parent() -> genitore diretto
    // .parents(".selettore") -> antenati
    // .children() -> figli diretti
    // .find(".selettore") -> discendenti (anche nipoti)
    // .siblings() -> fratelli
    // .next() / .prev() -> successivo / precedente

});
