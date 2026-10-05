"use strict";

const URL_BASE = "http://localhost/2026_27/5EINF/MVC_Movies_Roby/index.php";
let tuttiIFilm = []

$(document).ready(function () {
    caricaProdotti();

    function caricaProdotti() {
        let request = inviaRichiesta("GET", URL_BASE + "?action=getAll");
        request.fail(errore);
        request.done(function (film) {
            tuttiIFilm = film;
            mostraFilm(film);
        });
    }

    function mostraFilm(film) {
        let lista = $("#listaFilm");
        lista.empty();
        for (let f of film) {
            let li = $("<li>");

            // Aggiungo nome film
            $("<span class='nome-film'>").text(f.titolo).appendTo(li);

            // Aggiungo pulsante "modifica"
            $("<button>")
                .addClass("btn-modifica")
                .text("Modifica")
                .on("click", function () {
                    modificaFilm(f.id, f.titolo);
                }).appendTo(li);

            // Aggiungo pulsante "elimina"
            $("<button>")
                .addClass("btn-elimina")
                .text("Elimina")
                .on("click", function () {
                    eliminaFilm(f.id);
                }).appendTo(li);

            lista.append(li);
        }

    }

    $("#formAggiungi").on("submit", function (e) {
        e.preventDefault();
        let film = $("#inputFilm").val().trim();
        if (!film) return;

        let request = inviaRichiesta("POST", URL_BASE + "?action=inserisci", { prod: film });
        request.fail(errore);
        request.done(function (data) {
            $("#inputFilm").val("");
            caricaProdotti();
            console.log("Film ricevuti:", film);
        });
    });

    // Funzione per modificare un film
    function modificaFilm(id, titoloAttuale) {
        let nuovoTitolo = prompt("Nuovo titolo:", titoloAttuale);

        if (nuovoTitolo && nuovoTitolo.trim() !== "") {
            let request = inviaRichiesta("PUT", URL_BASE + "?action=modifica&id=" + id, { prod: nuovoTitolo.trim() });
            request.fail(errore);
            request.done(function () {
                caricaProdotti();
            });
        }
    }

    // Funzione per eliminare un film
    function eliminaFilm(id) {
        if (confirm("Sei sicuro di voler eliminare questo film?")) {
            let request = inviaRichiesta("DELETE", URL_BASE + "?action=elimina&id=" + id);
            request.fail(errore);
            request.done(function () {
                caricaProdotti();
            });
        }
    }
    //Funzione per la ricerca
    $("#ricercaFilm").on("keyup", function (e) {
        let termine = $(this).val().trim().toLowerCase();

        if (termine === "") {
            mostraFilm(tuttiIFilm); 
        } else {
            let filmFiltrati = tuttiIFilm.filter(f =>
                f.titolo.toLowerCase().includes(termine)
            );
            mostraFilm(filmFiltrati);
        }
    });
});
