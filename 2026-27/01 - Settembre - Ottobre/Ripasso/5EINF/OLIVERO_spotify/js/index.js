"use strict";

const URL_BASE = "http://localhost/2026_27/5EINF/OLIVERO_spotify/index.php";

$(document).ready(function () {

    caricaCanzoni();

    $("#inputRicerca").on("input", function () {
        caricaCanzoni();
    });

    function caricaCanzoni() {
        let q = $("#inputRicerca").val().trim();
        let request = inviaRichiesta("GET", URL_BASE + "?action=getAll&q=" + encodeURIComponent(q));
        request.fail(errore);
        request.done(function (canzoni) {
            let lista = $("#listaCanzoni");
            lista.empty();

            for (let c of canzoni) {
                let li = $("<li>");

                let infoDiv = $("<div>").addClass("info-canzone");
                $("<strong>").text(c.titolo).appendTo(infoDiv);
                $("<span>").text(" - " + c.artista).appendTo(infoDiv);
                if (c.album) {
                    $("<span>").text(" (" + c.album + ")").addClass("album").appendTo(infoDiv);
                }
                infoDiv.appendTo(li);

                $("<button>")
                    .addClass("btn-modifica")
                    .text("Modifica Titolo")
                    .on("click", function () {
                        modificaTitoloCanzone(c.id, c.titolo);
                    })
                    .appendTo(li);

                $("<button>")
                    .addClass("btn-modifica-artista")
                    .text("Modifica Artista")
                    .on("click", function () {
                        modificaArtistaCanzone(c.id, c.artista);
                    })
                    .appendTo(li);

                $("<button>")
                    .addClass("btn-elimina")
                    .text("Elimina")
                    .on("click", function () {
                        eliminaCanzone(c.id);
                    })
                    .appendTo(li);

                lista.append(li);
            }
        });
    }

    $("#formAggiungi").on("submit", function (e) {
        e.preventDefault();

        let titolo = $("#inputTitolo").val().trim();
        let artista = $("#inputArtista").val().trim();
        let album = $("#inputAlbum").val().trim();
        let anno = $("#inputAnno").val().trim();

        if (!titolo || !artista) {
            alert("Titolo e artista sono obbligatori");
            return;
        }

        let dati = {
            titolo: titolo,
            artista: artista,
            album: album,
            anno: anno ? parseInt(anno) : null
        };

        let request = inviaRichiesta("POST", URL_BASE + "?action=inserisci", dati);
        request.fail(errore);
        request.done(function () {
            $("#inputTitolo").val("");
            $("#inputArtista").val("");
            $("#inputAlbum").val("");
            $("#inputAnno").val("");
            caricaCanzoni();
        });
    });

    function eliminaCanzone(id) {
        if (!confirm("Eliminare questo film?")) return;

        let request = inviaRichiesta("DELETE", URL_BASE + "?action=elimina&id=" + id);
        request.fail(errore);
        request.done(function () {
            caricaCanzoni();
        });
    }

    function modificaTitoloCanzone(id, titoloAttuale) {
        let nuovoTitolo = prompt("Nuovo titolo:", titoloAttuale);
        if (nuovoTitolo === null) return;

        nuovoTitolo = nuovoTitolo.trim();
        if (!nuovoTitolo) return;

        let request = inviaRichiesta("PATCH", URL_BASE + "?action=modificaTitolo&id=" + id, {
            titolo: nuovoTitolo
        });
        request.fail(errore);
        request.done(function () {
            caricaCanzoni();
        });
    }

    function modificaArtistaCanzone(id, artistaAttuale) {
        let nuovoArtista = prompt("Nuovo Artista:", artistaAttuale);
        if (nuovoArtista === null) return;

        nuovoArtista = nuovoArtista.trim();
        if (!nuovoArtista) return;

        let request = inviaRichiesta("PATCH", URL_BASE + "?action=modificaArtista&id=" + id, {
            artista: nuovoArtista
        });
        request.fail(errore);
        request.done(function () {
            caricaCanzoni();
        });
    }
});


