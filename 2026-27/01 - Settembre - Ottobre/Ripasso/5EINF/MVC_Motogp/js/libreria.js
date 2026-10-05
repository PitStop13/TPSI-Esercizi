"use strict";

// =============================================================================
// FUNZIONE HELPER: inviaRichiesta
// Incapsula una chiamata asincrona AJAX tramite jQuery ($.ajax).
// Gestisce automaticamente la formattazione dei parametri e gli header HTTP.
//
// Parametri:
// - method:     metodo HTTP in stringa ("GET", "POST", "PATCH", "DELETE")
// - url:        endpoint da contattare (es. "index.php?action=getAll")
// - parameters: oggetto JavaScript con i dati da inviare al server (default {})
// =============================================================================
function inviaRichiesta(method, url, parameters = {}) {
    let contentType;

    // PASSO 1: Determinare il Content-Type e il formato dei dati da trasmettere.
    // - Per GET e DELETE i parametri viaggiano normalmente via URL (query string o form urlencoded).
    // - Per POST e PATCH inviamo i dati in formato JSON standard (application/json),
    //   quindi convertiamo l'oggetto JS in stringa con JSON.stringify(parameters).
    if (method.toUpperCase() === "GET" || method.toUpperCase() === "DELETE") {
        contentType = "application/x-www-form-urlencoded;charset=utf-8";
    } else {
        contentType = "application/json; charset=utf-8";
        parameters = JSON.stringify(parameters);
    }

    // PASSO 2: Eseguire la chiamata $.ajax di jQuery e restituire la Promise (jqXHR).
    // In questo modo il chiamante può agganciare .done(callback) e .fail(callback).
    return $.ajax({
        url: url,
        data: parameters,
        type: method,
        contentType: contentType,
        dataType: "json",    // Si aspetta che la risposta del server sia JSON e la parsa automaticamente
        timeout: 5000,       // Timeout massimo di 5 secondi
        cache: false         // Disabilita la cache del browser per avere sempre dati freschi
    });
}

// =============================================================================
// FUNZIONE DI GESTIONE DEGLI ERRORI: errore
// Callback predefinita da passare a .fail(...) delle richieste AJAX.
// Riceve l'oggetto jqXHR e mostra un avviso all'utente.
// =============================================================================
function errore(jqXHR) {
    // status 0 indica solitamente che il server è spento o che c'è un blocco CORS / rete
    if (jqXHR.status === 0) {
        alert("Server non raggiungibile");
    } else {
        // Mostra il codice di errore HTTP (es. 404, 500) e il messaggio restituito dal server
        alert("Errore " + jqXHR.status + ": " + jqXHR.responseText);
    }
}

