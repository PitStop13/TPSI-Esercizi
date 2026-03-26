"use strict";

// ============================================================
// inviaRichiesta() - Invia una richiesta HTTP tramite $.ajax()
// method:     "GET", "POST", "PUT", "PATCH", "DELETE"
// url:        indirizzo del server
// parameters: dati da inviare (vuoto per GET)
// RITORNA:    jqXHR (promessa su cui usare .done() e .fail())
// ============================================================
function inviaRichiesta(method, url, parameters = {}) {
    let contentType;
    if (method.toUpperCase() == "GET")
        contentType = "application/x-www-form-urlencoded;charset=utf-8";
    else {
        contentType = "application/json; charset=utf-8";
        parameters = JSON.stringify(parameters);
    }
    return $.ajax({
        "url": url,
        "data": parameters,
        "type": method,
        "contentType": contentType,
        "dataType": "json",
        "timeout": 5000,
    });
}

// ============================================================
// errore() - Gestisce gli errori delle chiamate AJAX
// Passala sempre a .fail() → request.fail(errore)
// ============================================================
function errore(jqXHR, textStatus, stringError) {
    if (jqXHR.status == 0)
        alert("ERRORE: Server non raggiunto.\nHai avviato server/Start.bat?");
    else if (jqXHR.status == 404)
        alert("ERRORE 404: Risorsa non trovata.\nControlla l'URL e il nome della collection in db.json.");
    else
        alert("ERRORE " + jqXHR.status + ": " + jqXHR.responseText);
}
