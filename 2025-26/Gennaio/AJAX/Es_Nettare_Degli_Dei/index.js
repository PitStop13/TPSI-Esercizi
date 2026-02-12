const URL = "https://api.openbrewerydb.org/v1/breweries";

let tabella = $("#table-body");
let select = $("#select-tipologia");

$(document).ready(function () {
    let request = inviaRichiesta("GET", URL);
    request.fail(errore);
    request.done(function (data) {
        console.log(data);
        visualizzaTabella(data, tabella);
        popolaSelect(data, select);
        select.change(function () {

            let tipologia = select.val();
            // let filteredData = data.filter(function (item) {
            //     return item.brewery_type == tipologia;
            // });
            //oppure
            let filteredData = data.filter(item => item.brewery_type == tipologia);
            visualizzaTabella(filteredData, tabella);
        });
    })
})

function visualizzaTabella(data, tabella) {
    tabella.empty();
    for (let i = 0; i < data.length; i++) {
        let riga = "<tr>";
        riga += "<td>" + data[i].name + "</td>";
        riga += "<td>" + data[i].brewery_type + "</td>";
        riga += "<td>" + data[i].city + "</td>";
        riga += "<td>" + data[i].state_province + "</td>";
        riga += "<td>" + data[i].country + "</td>";
        riga += "<td>" + data[i].website_url + "</td>";
        riga += "</tr>";
        tabella.append(riga);
    }
}

function popolaSelect(data, select) {
    select.empty();
    for (let i = 0; i < data.length; i++) {
        if (select.find("option[value='" + data[i].brewery_type + "']").length == 0) {
            let opzione = "<option value='" + data[i].brewery_type + "'>" + data[i].brewery_type + "</option>";
            select.append(opzione);
        }
    }
}