"use strict"

function inviaRichiesta(method, url, parameters = {}) {
    let config = {
        "baseURL": "https://randomuser.me",
        "url": url,        //Url della risorsa
        "method": method,    //Metodo con cui faccio la richiesta
        "headers": {
            //Indico il dato desiderato in risposta
            "Accept": "application/json"
        },
        "responseType": "json", //Tipo di dato che mi aspetto in risposta
        "timeout": 5000 //Tempo di timeout in millisecondi
    }

    if (method.toUpperCase() == "GET") {
        config["params"] = parameters;
        config["contentType"] = "application/x-www-form-urlencoded;charset=utf-8";
    }
    else //Se diverso da GET: POST, DELETE, PUT, PATCH
    {
        config["data"] = parameters;
        config.headers["Content-Type"] = "application/json;charset=utf-8";
    }
    return (axios(config));
}

function errore(err) {
    if (!err.response) {
        alert("connection refused or server timeout");
    }
    else if (err.response.status == 200) {
        alert("Errore Formattazione dati\n" + err.response.data);
    }
    else {
        alert("Server Error: " + err.response.status + " - " + err.response.data);
    }
}

