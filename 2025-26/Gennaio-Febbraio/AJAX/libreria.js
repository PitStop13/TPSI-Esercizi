"use strict";
//esempio di parameters={"nome":"Francesco","cognome":"Bianchi"}
function inviaRichiesta(method, url, parameters={}) {
    let contentType;
    if (method.toUpperCase() == "GET")
        contentType="application/x-www-form-urlencoded;charset=utf-8";
    else //Se diverso da GET: POST, DELETE, PUT, PATCH
    {
        contentType="application/json;charset=utf-8";
        parameters=JSON.stringify(parameters);
    }

    let ajaxOptions={
        url:url,        //Url della risorsa
        type:method,    //Metodo con cui faccio la richiesta
        data:parameters, //Parametri passati nella richiesta
        contentType:contentType, //Informo il webservice su quale dato sto inviando
        dataType:"json",  //Tipologia di dato che voglio che il webservice mi restituisca
        timeout:5000 //Tempo di timeout in millisecondi
    }
    return($.ajax(ajaxOptions));
}

function errore (jqXHR, test_status, str_error) {
    if(jqXHR.status==0)
        alert("connection refused or server timeout");
    else if (jqXHR.status == 200)
        alert("Errore Formattazione dati\n" + jqXHR.responseText);
    else
        alert("Server Error: "+jqXHR.status+ " - " +jqXHR.responseText);
}
