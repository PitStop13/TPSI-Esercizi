"use strict"

$(document).ready(function () {
    let request = inviaRichiesta("get", "api?results=5");
    //Oppure....
    // let request = inviaRichiesta("get", "api", { results: 5 });

    request.catch(errore);
    request.then(function (response) {
        console.log(response);
    })
});