"use strict"
const URL = "https://api.openbrewerydb.org/v1/breweries";

let chartOptions = {
    type : "polarArea", //doughnut = ciambella, radar = radar, bar = barre, ...per altro cerco su charjs per altri o documentazione
    data : {
        labels : [],
        datasets : [{
            label : "Risultati 2025-26", //titolo del grafico
            data:[12,9,37], //valori da assegnare per ogni singola barra
            backgroundColor : ["red","blu","green"],
            borderColor : ["black","yellow","red"],
            borderWidth : 1 //di default è due poi io posso scegliere se aumentare o cosa fare

        }]
    } 
};

$(document).ready(function () {
    let container = $("#wrapper");

    // --- Creazione Dinamica UI ---

    // Header
    let header = $("<header>").addClass("text-center mb-5").appendTo(container);
    $("<h1>").addClass("display-4 font-weight-bold mb-3")
        .text("Benvenuti nella lista dei birrifici migliori del mondo!")
        .appendTo(header);
    $("<div>").addClass("divider mx-auto mb-4").appendTo(header);
    $("<p>").addClass("lead text-muted")
        .text("Seleziona la tipologia di birra che ti interessa:")
        .appendTo(header);

    let row = $("<div>").addClass("row justify-content-center").appendTo(header);
    let col = $("<div>").addClass("col-md-6 col-lg-4").appendTo(row);
    let select = $("<select>").attr("id", "select-tipologia")
        .addClass("custom-select custom-select-lg shadow-sm")
        .appendTo(col);
    $("<option>").val("").text("Scegli una tipologia...").prop("selected", true).appendTo(select);

    // Tabella
    let section = $("<section>").addClass("results-section mb-5").appendTo(container);
    let card = $("<div>").addClass("card shadow border-0 overflow-hidden").appendTo(section);
    let tableResp = $("<div>").addClass("table-responsive").appendTo(card);
    let table = $("<table>").addClass("table table-hover mb-0").appendTo(tableResp);
    let thead = $("<thead>").addClass("thead-dark").appendTo(table);
    let trHead = $("<tr>").appendTo(thead);

    let headers = ["NAME", "BREWERY_TYPE", "CITY", "STATE_PROVINCE", "COUNTRY", "WEBSITE_URL"];
    headers.forEach(text => {
        $("<th>").text(text).appendTo(trHead);
    });

    let tabella = $("<tbody>").attr("id", "table-body").appendTo(table);

    // --- Logica Dati con LocalStorage ---
    let localData = localStorage.getItem("birrifici");

    if (localData) {
        console.log("Dati caricati da localStorage");
        let data = JSON.parse(localData);
        setupUI(data, tabella, select);
    } else {
        console.log("Dati non trovati, invio richiesta API...");
        let request = inviaRichiesta("GET", URL);
        request.fail(errore);
        request.done(function (data) {
            localStorage.setItem("birrifici", JSON.stringify(data));
            setupUI(data, tabella, select);
        });
    }


    let canvas1 = $("#canvas1");
    let chart1 = new Chart(canvas1,chartOptions);

    let canvas2 = $("#canvas2");
    let chart2 = new Chart(canvas2,chartOptions);

    let canvas3 = $("#canvas3");
    let chart3 = new Chart(canvas3,chartOptions);

    let canvas4 = $("#canvas4");
    let chart4 = new Chart(canvas4,chartOptions);

    let canvas5 = $("#canvas5");
    let chart5 = new Chart(canvas5,chartOptions);
});

function setupUI(data, tabella, select) {
    visualizzaTabella(data, tabella);
    popolaSelect(data, select);

    select.change(function () {
        // Rileggiamo sempre dal localStorage
        let dataFromStorage = JSON.parse(localStorage.getItem("birrifici"));
        let tipologia = select.val();

        if (tipologia === "") {
            visualizzaTabella(dataFromStorage, tabella);
        } else {
            let filteredData = dataFromStorage.filter(item => item.brewery_type == tipologia);
            visualizzaTabella(filteredData, tabella);
        }
    });
}

function visualizzaTabella(data, tabella) {
    tabella.empty();
    for (let i = 0; i < data.length; i++) {
        let riga = $("<tr>");
        $("<td>").text(data[i].name).appendTo(riga);
        $("<td>").text(data[i].brewery_type).appendTo(riga);
        $("<td>").text(data[i].city).appendTo(riga);
        $("<td>").text(data[i].state_province).appendTo(riga);
        $("<td>").text(data[i].country).appendTo(riga);

        let website = data[i].website_url;
        if (website) {
            let link = $("<a>").attr("href", website).attr("target", "_blank").addClass("btn-website").text("Sito web");
            $("<td>").append(link).appendTo(riga);
        } else {
            $("<td>").text("").appendTo(riga);
        }

        tabella.append(riga);
    }
}

/**
 * Popola la select con le tipologie di birrificio presenti nei dati, evitando duplicati.
 * Utilizzo un Set per l'univocità come suggerito.
 */
function popolaSelect(data, select) {
    // Estraiamo tutti i tipi, rimuoviamo i null/undefined e creiamo un Set per l'univocità
    const tipologieUniche = [...new Set(data.map(item => item.brewery_type).filter(Boolean))];

    tipologieUniche.forEach(type => {
        select.append($("<option>").val(type).text(type));
    });
}
