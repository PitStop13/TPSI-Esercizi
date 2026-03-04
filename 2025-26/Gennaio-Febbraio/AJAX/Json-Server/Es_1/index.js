"use strict"

const URL = "http://localhost:3000";
$(document).ready(function () {

});

function leggiPersone() {
    let request = inviaRichiesta("GET", URL + "/people");

    request.fail(errore);

    $("table tbody").html("");
    request.done(function (jsonPersone) {
        console.log(jsonPersone);
        for (let i = 0; i < jsonPersone.length; i++) {
            let persona = jsonPersone[i];

            let tr = $("<tr>");
            tr.appendTo("table tbody");
            $("<td>").appendTo(tr).text(persona.id);
            $("<td>").appendTo(tr).text(persona.nome);
            $("<td>").appendTo(tr).text(persona.genere);
            $("<td>").appendTo(tr).text(persona.classe);
        }
    });
}

function cancellaPersona() {
    let request = inviaRichiesta("GET", URL + "/people");
    request.fail(errore);
    request.done(function (jsonPersone) {
        if (jsonPersone.length > 0) {
            let request = inviaRichiesta("DELETE", URL + "/people/" + jsonPersone[jsonPersone.length - 1].id);
            request.fail(errore);
            request.done(function () {
                console.log("Cancellazione effettuata con successo!");
                leggiPersone();
            });
        }
    });
}


function inserisciPersona() {
    let persona = {
        id: prompt("Inserisci l'id della persona"),
        nome: prompt("Inserisci il nome della persona"),
        genere: prompt("Inserisci il genere della persona"),
        classe: prompt("Inserisci la classe della persona")
    };
    let request = inviaRichiesta("POST", URL + "/people", persona);

    request.fail(errore);
    request.done(function () {
        console.log("Inserimento effettuato con successo!");
        leggiPersone();
    });
    if (persona.id == null || persona.nome == null || persona.genere == null || persona.classe == null) {
        alert("Annullato!");
        cancellaPersona();
    }

}


function sostituisciPersona() {

    //prendo l'ultima persona e la cambio con la nuova persona che inserisce l'utente tramite un pop up che gli chiede i dati
    let request = inviaRichiesta("GET", URL + "/people");
    request.fail(errore);
    request.done(function (jsonPersone) {
        if (jsonPersone.length > 0) {
            let idPersona = prompt("Inserisci l'id della persona da sostituire");
            let persona = jsonPersone[idPersona];
            let personaNuova = {
                nome: prompt("Inserisci il nome della persona"),
                genere: prompt("Inserisci il genere della persona"),
                classe: prompt("Inserisci la classe della persona")
            };
            let request = inviaRichiesta("PUT", URL + "/people/" + persona.id, personaNuova);
            request.fail(errore);
            request.done(function () {
                console.log("Sostituzione effettuata con successo!");
                leggiPersone();
            });
        }
    });
    //se clicco annulla devo annullare la richiesta
    if (persona.nome == null || persona.genere == null || persona.classe == null) {
        alert("Annullato!");
        cancellaPersona();
    }
}


function sostituisciNomePersona() {
    let request = inviaRichiesta("PATCH", URL + "/people/" + prompt("Inserisci l'id della persona da sostituire"), { nome: prompt("Inserisci il nuovo nome") });
    request.fail(errore);
    request.done(function () {
        console.log("Sostituzione effettuata con successo!");
        leggiPersone();
    });
}



