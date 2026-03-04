"use strict"
const MMG = 24 * 60 * 60 * 1000;
const URL = "http://localhost:3000"
const X_OFFSET = 180;
const Y_OFFSET = 210;


$(document).ready(function () {
    let dataInizio, dataFine;
    let ombrelloni;
    let prenotazioni = [];


    let _wrapper = $("#wrapper");
    let _mappa = $("#wrapper").children("div");
    let _btnVisualizzaMappa = $("#wrapper").children("button").eq(0);
    let _dataInizio = $("#wrapper").find("input").eq(0);
    let _dataFine = $("#wrapper").find("input").eq(1);
    let _msg = $("wrapper").children("label").eq(2);


    _mappa.hide();
    _btnVisualizzaMappa.prop("disabled", true);
    _dataFine.prop("disabled", true);


    _dataInizio.on("change", function () {
        dataInizio = new Date(_dataInizio.prop("value"));
        console.log(dataInizio);
        _dataFine.prop("disabled", false);
        _dataFine.prop("min", _dataInizio.prop("value"));


        if (_dataFine.prop("value") != "" &&
            _dataFine.prop("value") <= _dataInizio.prop("value")
        ) {
            _dataFine.prop("value", "");
        }
    });


    _dataFine.on("change", function () {
        dataFine = new Date(_dataFine.prop("value"));
        console.log(dataFine);
        let nGiorni = (dataFine - dataInizio) / MMG;
        _msg.text("Giorni richiesti: " + nGiorni);
        _btnVisualizzaMappa.prop("disabled", false);
    });


    _btnVisualizzaMappa.on("click", function () {
        _mappa.show(1000);
        let url = URL + "/ombrelloni";
        let rq = inviaRichiesta("GET", url);
        rq.fail(errore);
        rq.done(function (data) {
            console.log(data);
            ombrelloni = data;
            let x = X_OFFSET;
            let y = Y_OFFSET;
            let id = 1;


            for (let i = 0; i <= 18; i++) {
                for (let j = 0; j <= 37; j++) {
                    if (i != 9 && j != 22) {
                        let div = $("<div>")
                            .addClass("ombrellone")
                            .css({
                                "left": (x + j * 16),
                                "top": (y + i * 16)
                            })
                            .prop("id", `omb-${id}`)
                            .appendTo(_mappa);


                        if (isOccupato(ombrelloni[id - 1].stato)) {
                            div.addClass("red");
                        } else {
                            div.on("click", ombrelloniClick);
                        }


                        id++;
                    }
                }
                x -= 2;
            }


            visualizzaPulsantePrenotazione();


        });
    });


    function isOccupato(vetStato) {
        let pos1 = (dataInizio - new Date("2026-06-01")) / MMG;
        let pos2 = (dataFine - new Date("2026-06-01")) / MMG;


        for (let i = pos1; i <= pos2; i++) {
            if (vetStato[i] != 0) {
                return true;
            }
        }


        return false;
    }


    function ombrelloniClick() {
        if (!$(this).hasClass("blue")) {
            $(this).addClass("blue");
            prenotazioni.push($(this).prop("id"));
        } else {
            $(this).removeClass("blue");
            let pos = prenotazioni.indexOf($(this).prop("id"));


            if (pos != -1) {
                prenotazioni.splice(pos, 1);
            }
        }


        console.log(prenotazioni);
    }


    function visualizzaPulsantePrenotazione() {
        $("<a>")
            .text("Prenota")
            .addClass("button buttonEnabled prenota")
            .appendTo(_mappa)
            .on("click", function () {
                for (let item of prenotazioni) {
                    console.log(item);
                    let id = parseInt(item.split("-")[1]);
                    let pos1 = (dataInizio - new Date("2026-06-01")) / MMG;
                    let pos2 = (dataFine - new Date("2026-06-01")) / MMG;
                    for (let i = pos1; i <= pos2; i++) {
                        ombrelloni[id - 1].stato[i] = 1;
                    }


                    let url = URL + "/ombrelloni/" + id;
                    let rq = inviaRichiesta("PUT", url, ombrelloni[id - 1]);
                    rq.fail(errore);
                    rq.done(function () {
                        console.log("Ombrellone aggiornato");
                    });
                    sleep();
                }


                alert("Ombrelloni prenotati con successo");
                window.location.reload();
            });
    }


    function sleep() {
        let ttl = (new Date()).getTime() + 300;
        while ((new Date()).getTime() < ttl);
    }
});



