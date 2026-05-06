"use strict";
const URl = "http://localhost:8080/2025_26/4EINF/PHP/Es05_Onlitest_Con_Asincrono/php";

$(document).ready(function () {
    leggiDomande();
});

function aggiungiDomanda() {
    let testoDomanda = $("#txtDomanda").val();
    let request = inviaRichiesta("POST", URl + "/setDomanda.php", { domanda: testoDomanda });
    request.fail(errore);
    request.done(function (risposta) {
        console.log(risposta);
        alert("Domanda aggiunta con successo!");
        leggiDomande();
    });
}

function leggiDomande() {
    let request = inviaRichiesta("GET", URl + "/getDomande.php");
    request.fail(errore);
    request.done(function (domande) {
       let tbody = $("tbody");
       tbody.html("");
       for (let i = 0; i < domande.length; i++) {
            let tr = $("<tr>");
            let td = $("<td>");
            td.text(domande[i].domanda);
            tr.append(td);
            tbody.append(tr);
        }
    });
}