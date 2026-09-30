"use strict";

const URL_BASE = "http://localhost/2026_27/5EINF/MVC_Movies_Prof/index.php";

$(document).ready(function () {

    caricaFilm();

    $("#inputRicerca").on("input", function () {
        caricaFilm();
    });

    function caricaFilm() {
        let q = $("#inputRicerca").val().trim();//pulita dai spazi
        let request = inviaRichiesta("GET", URL_BASE + "?action=getAll&q=" + encodeURIComponent(q));
        request.fail(errore);
        request.done(function (film) {
            let lista = $("#listaFilm");
            lista.empty();

            for (let f of film) {
                let li = $("<li>");
                $("<span>").text(f.titolo).appendTo(li);

                $("<button>")
                    .addClass("btn-modifica")
                    .text("Modifica")
                    .on("click", function () {
                        modificaTitoloFilm(f.id, f.titolo);
                    })
                    .appendTo(li);

                $("<button>")
                    .addClass("btn-elimina")
                    .text("Elimina")
                    .on("click", function () {
                        eliminaFilm(f.id);
                    })
                    .appendTo(li);

                lista.append(li);
            }
        });
    }

    $("#formAggiungi").on("submit", function (e) {
        e.preventDefault();//quando utlizate il form evita di refresh della paginan altimenti fa un refresh

        let titolo = $("#inputTitolo").val().trim();
        if (!titolo) return;

        let request = inviaRichiesta("POST", URL_BASE + "?action=inserisci", { titolo: titolo });//li viene passat paramtro il titolo la prima e la chivae json
        request.fail(errore);
        request.done(function () {
            $("#inputTitolo").val("");
            caricaFilm();
        });
    });

    function eliminaFilm(id) {
        if (!confirm("Eliminare questo film?")) return;

        let request = inviaRichiesta("DELETE", URL_BASE + "?action=elimina&id=" + id);
        request.fail(errore);
        request.done(function () {
            caricaFilm();
        });
    }

    function modificaTitoloFilm(id, titoloAttuale) {
        let nuovoTitolo = prompt("Nuovo titolo:", titoloAttuale);
        if (nuovoTitolo === null) return;

        nuovoTitolo = nuovoTitolo.trim();
        if (!nuovoTitolo) return;

        let request = inviaRichiesta("PATCH", URL_BASE + "?action=modificaTitolo&id=" + id, {
            titolo: nuovoTitolo
        });
        request.fail(errore);
        request.done(function () {
            caricaFilm();
        });
    }
});

