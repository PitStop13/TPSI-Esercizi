"use strict"
//esempio di parameters={"nome":"Mario","cognome":"Rossi"}
function inviaRichiesta(method, url, parameters = {}) { //metodo contiene get o post,url=risorsa,parameters essendo che ha le {} è facoltativo in quanto se non lo metto 
    // assume il alore di un Json Vuoto
    let contentType;
    if (method.toUpperCase() == "GET") {
        contentType = "application/x-www-form-urlencoded;charset = utf-8";
    } else //se diverso da GET: POST,DELETE,PUT,PATCH
    {
        contentType = "application/json;charset = utf-8";
        parameters = JSON.stringify(parameters)
    }
    let ajaxOptions = {
        url: url, //url della risposta
        type: method, //metodo di invio
        data: parameters, //parametri da inviare
        contentType: contentType, //informo il web server del tipo di dato che sto inviando
        dataType: "json", //informo il web server del tipo di dato che voglio ricevere
        timeout: 5000, //timeout in millisecondi (se aspetto di più di 5 secondi vado in errore)
        error: function (jqXHR, test_status, str_error) {
            if (jqXHR.status == 0)
                alert("connection refused or server timeout");
            else if (jqXHR.status == 200)
                alert("Errore Formattazione dati\n" + jqXHR.responseText);
            else
                alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
        }
    }
    return ($.ajax(ajaxOptions));
}
