"use strict";

function inviaRichiesta(method, url, parameters = {}) {
    let contentType;
    if (method.toUpperCase() === "GET" || method.toUpperCase() === "DELETE") {
        contentType = "application/x-www-form-urlencoded;charset=utf-8";
    } else {
        contentType = "application/json; charset=utf-8";
        parameters = JSON.stringify(parameters);
    }

    return $.ajax({
        url: url,
        data: parameters,
        type: method,
        contentType: contentType,
        dataType: "json",
        timeout: 5000,
        cache: false
    });
}

function errore(jqXHR) {
    if (jqXHR.status === 0) {
        alert("Server non raggiungibile");
    } else {
        alert("Errore " + jqXHR.status + ": " + jqXHR.responseText);
    }
}

