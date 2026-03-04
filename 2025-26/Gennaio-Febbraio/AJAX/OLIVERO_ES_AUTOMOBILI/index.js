"use strict";

const URL = "http://localhost:3000";
$(document).ready(function () {
    let _lstMarche = $("#lstMarche");
    let _lstModelli = $("#lstModelli");
    let _table = $("table");
    let _dettagli = $(".row").eq(2).children("div").eq(1);
    _dettagli.hide();

    let _btnAggiorna = $("#btnAggiorna");
    _btnAggiorna.on("click", aggiorna);

    let request = inviaRichiesta("get", URL + "/marche");
    request.fail(errore);
    request.done(function (marche) {
        for (let marca of marche)
            $("<option>").val(marca.id).text(marca.nome).appendTo(_lstMarche);
        _lstMarche.prop("selectedIndex", -1);
    });

    _lstMarche.on("change", function () {
        let marcaSelezionata = _lstMarche.val();
        let request = inviaRichiesta("get", URL + "/modelli?codMarca=" + marcaSelezionata);
        request.fail(errore);
        request.done(function (modelli) {
            _lstModelli.html("");
            for (let modello of modelli)
                $("<option>").val(modello.id)
                    .text(modello.nome + " " + modello.alimentazione)
                    .prop({
                        "nome": modello.nome,
                        "alimentazione": modello.alimentazione
                    })
                    .appendTo(_lstModelli);
            _lstModelli.prop("selectedIndex", -1);
        });
    });

    _lstModelli.on("change", function () {
        let selectedOption = $(this).children("option").eq(this.selectedIndex);
        let nomeModello = selectedOption.prop("nome");
        let alimentazione = selectedOption.prop("alimentazione");
        let codiceModello = _lstModelli.val();
        console.log(codiceModello);
        let request = inviaRichiesta("get", URL + "/automobili?codModello=" + codiceModello);
        request.fail(errore);
        request.done(function (automobili) {
            _table.html("");
            creaIntestazione();
            for (let i = 0; i < automobili.length; i++) {
                creaRigaTabella(automobili[i], nomeModello, alimentazione);
            }

        });

    });

    function creaRigaTabella(automobile, nome, alimentazione) {
        let tbody = _table.children("tbody");
        let tr = $("<tr>").appendTo(tbody);

        $("<td>").appendTo(tr).text(nome);
        $("<td>").appendTo(tr).text(alimentazione);

        $("<td>").appendTo(tr).text(automobile.colore);
        $("<td>").appendTo(tr).text(automobile.anno);
        $("<td>").appendTo(tr).append($("<img>")
            .prop("src", "img/" + automobile.img)
            .css({ "height": 65 }));
        $("<td>").appendTo(tr).append($("<button>").addClass("btn btn-success")
            .text("DETTAGLI")
            .prop("id", "dettagli-" + automobile.id)
            .on("click", dettagli));
        $("<td>").appendTo(tr).append($("<button>").addClass("btn btn-secondary")
            .text("ELIMINA")
            .prop("id", "elimina-" + automobile.id)
            .on("click", elimina));

    }

    function dettagli() {
        //mostra il form _dettagli
        _dettagli.show();
        let codiceAutomobile = $(this).prop("id").split("-")[1];
        let request = inviaRichiesta("get", URL + "/automobili/" + codiceAutomobile);
        request.fail(errore);
        request.done(function (automobile) {
            $("#txtId").val(automobile.id);
            $("#txtTarga").val(automobile.targa);
            $("#txtColore").val(automobile.colore);
            $("#txtAnno").val(automobile.anno);
            $("#txtPrezzo").val(automobile.prezzo);
            $("#txtKm").val(automobile.km);
            $("#imgLarge").prop("src", "img/" + automobile.img).css({ "max-height": "120px" });

            let request2 = inviaRichiesta("get", URL + "/modelli/" + automobile.codModello);
            request2.fail(errore);
            request2.done(function (modello) {
                $("#txtCilindrata").val(modello.cilindrata);
                $("#txtAlimentazione").val(modello.alimentazione);
                $("#txtNome").val(modello.nome);
            });

        });
    }

    function aggiorna() {
        let id = $("#txtId").val();
        let prezzo = $("#txtPrezzo").val();

        let dati = { prezzo: prezzo };

        let request = inviaRichiesta("patch", URL + "/automobili/" + id, dati);
        request.fail(errore);
        request.done(function () {
            _dettagli.hide();
            _lstModelli.trigger("change"); // ricarica tabella
        });
    }


    function elimina() {
        let codiceAutomobile = $(this).prop("id").split("-")[1];
        let request = inviaRichiesta("delete", URL + "/automobili/" + codiceAutomobile);
        request.fail(errore);
        request.done(function () {
            //aggiorno la pagina
            _lstModelli.trigger("change");
            //+
            //|
            //|
            //va a fare la chiamata per aggiornare la tabella,andando a chimare un altro elemento e poi 
            //rimettendo quello originale facendo sembrare che si aggiorni la tabella
            console.log("Automobile eliminata");
        });
    }

    function creaIntestazione() {
        let thead = $("<thead>").appendTo(_table);
        let tr = $("<tr>").appendTo(thead);
        $("<th>").appendTo(tr).text("NOME").css("width", "15%");
        $("<th>").appendTo(tr).text("ALIMENTAZIONE").css("width", "15%");
        $("<th>").appendTo(tr).text("COLORE").css("width", "15%");
        $("<th>").appendTo(tr).text("ANNO").css("width", "10%");
        $("<th>").appendTo(tr).text("IMG").css("width", "20%");
        $("<th>").appendTo(tr).text("DETTAGLI").css("width", "13%");
        $("<th>").appendTo(tr).text("ELIMINA").css("width", "12%");
        $("<tbody>").appendTo(_table);
    }
})