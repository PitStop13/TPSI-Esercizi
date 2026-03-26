const URL = "http://localhost:3000"
let lstPersonalTrainer;


$(document).ready(function () {
    let _lstAtleti = $("#lstAtleti")
    let _thead = $("thead")
    let _canvas = $("#canvas")




    let request = inviaRichiesta("GET", URL + "/atleti")
    request.fail(errore)
    request.done(function (atleti) {
        for (let atleta of atleti) {
            $("<option>").val(atleta.id).text(atleta.nome + " - " + atleta.peso).appendTo(_lstAtleti)
        }
        _lstAtleti.prop("selectIndex", -1)
    })


    getPersonalTrainer();


    _lstAtleti.on("change", function () {
        let idAtleta = _lstAtleti.val()
        let request = inviaRichiesta("GET", URL + "/esercizi?atletaId=" + idAtleta)
        request.fail(errore)
        request.done(function (esercizi) {
            $("tbody").html("")
            for (let esercizio of esercizi) {
                let tr = $("<tr>")
                $("<td>").appendTo(tr).text(esercizio.materia)
                $("<td>").appendTo(tr).text(lstPersonalTrainer[esercizio.personalTrainerId - 1].nome)
                $("<td>").appendTo(tr).text(esercizio.peso)
                $("<td>").appendTo(tr).text(esercizio.data)
                $("<td>").appendTo(tr).addClass("btn btn-success btn-xs").text("Aumenta peso").prop("id", esercizio.id).on("click", function () {
                    aumentaPeso(esercizio.id, esercizio.peso)
                })
                $("<td>").appendTo(tr).addClass("btn btn-danger btn-xs").text("Diminuisci peso").prop("id", esercizio.id).on("click", function () {
                    diminuisciPeso(esercizio.id, esercizio.peso)
                })
                $("tbody").append(tr)


            }
        })


    })
    function aumentaPeso(idEsercizio, peso) {
        let newPeso = peso + 1
        let request = inviaRichiesta("PATCH", URL + "/esercizi/" + idEsercizio, { "peso": newPeso })
        request.fail(errore)
        request.done(function () {
            _lstAtleti.trigger("change")


        })
    }


    function diminuisciPeso(idEsercizio, peso) {
        if (peso > 1) {
            let newPeso = peso - 1
            let request = inviaRichiesta("PATCH", URL + "/esercizi/" + idEsercizio, { "peso": newPeso })
            request.fail(errore)
            request.done(function () {
                _lstAtleti.trigger("change")


            })
        }


    }
})


function getPersonalTrainer() {
    let request = inviaRichiesta("GET", URL + "/personalTrainer")
    request.fail(errore)
    request.done(function (personalTrainers) {
        lstPersonalTrainer = personalTrainers


    })
}
