"use strict"

$(document).ready(function () {
    let request = inviaRichiesta("get", "https://randomuser.me/api", { "results": 5 });
    request.fail(errore);
    request.done(function (data) {
        //console.log(data);
        for (let i = 0; i < data.results.length; i++) {
            console.log(data.results[i].name.first + " " + data.results[i].name.last);
        }
    })
});