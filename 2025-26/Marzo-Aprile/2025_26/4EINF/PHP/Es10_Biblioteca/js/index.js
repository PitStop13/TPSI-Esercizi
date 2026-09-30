"use strict";

const PHP_URL = "php/";

window.onload = function () {
    caricaContatore();
    caricaAutori();
    caricaLibri();
};

// Aggiorna il numero totale di libri nel DB
function caricaContatore() {
    let req = inviaRichiesta("GET", PHP_URL + "getContatore.php");
    req.done(function (totale) {
        $("#lblContatore").text(totale);
    });
    req.fail(error);
}

// Popola il select #selAutore nel form "Aggiungi libro"
function caricaAutori() {
    let req = inviaRichiesta("GET", PHP_URL + "getAutori.php");
    req.done(function (autori) {
        let sel = $("#selAutore");
        sel.empty(); // svuota prima di ricaricare (serve dopo inserisciAutore)
        for (let i = 0; i < autori.length; i++) {
            sel.append('<option value="' + autori[i].id + '">' +
                autori[i].cognome + ' ' + autori[i].nome + '</option>');
        }
    });
    req.fail(error);
}

// Carica tutti i libri nella tabella (nessun filtro)
function caricaLibri() {
    let req = inviaRichiesta("GET", PHP_URL + "getLibri.php");
    req.done(function (libri) {
        let tbody = $("#tblLibri tbody");
        tbody.empty();
        for (let i = 0; i < libri.length; i++) {
            let l = libri[i];
            let riga = "<tr>" +
                "<td>" + l.titolo + "</td>" +
                "<td>" + l.cognome + " " + l.nome + "</td>" +
                "<td>" + l.anno_pubblicazione + "</td>" +
                "</tr>";
            tbody.append(riga);
        }
    });
    req.fail(error);
}

// Invia il nuovo libro al server via POST
function inserisciLibro() {
    let titolo   = $("#txtTitolo").val().trim();
    let anno     = $("#txtAnno").val().trim();
    let autoreId = $("#selAutore").val();

    if (titolo === "" || anno === "") {
        alert("Compila tutti i campi!");
        return;
    }

    let req = inviaRichiesta("POST", PHP_URL + "setLibro.php", {
        titolo: titolo,
        anno_pubblicazione: anno,
        autore_id: autoreId
    });
    req.done(function (msg) {
        alert(msg);
        $("#txtTitolo").val("");
        $("#txtAnno").val("");
        caricaContatore();
        caricaLibri();
    });
    req.fail(error);
}

// Invia il nuovo autore al server via POST,
// poi ricarica il select degli autori per averlo subito disponibile
function inserisciAutore() {
    let nome    = $("#txtNome").val().trim();
    let cognome = $("#txtCognome").val().trim();

    if (nome === "" || cognome === "") {
        alert("Compila nome e cognome!");
        return;
    }

    let req = inviaRichiesta("POST", PHP_URL + "setAutore.php", {
        nome: nome,
        cognome: cognome
    });
    req.done(function (msg) {
        alert(msg);
        $("#txtNome").val("");
        $("#txtCognome").val("");
        caricaAutori(); // aggiorna il select così il nuovo autore è subito selezionabile
    });
    req.fail(error);
}
