"use strict"
const URL = "http://localhost:8080/2025_26/4EINF/esOnlitestConAsincrono/php/getDomande.php"
$(document).ready(function () {
    let request = inviaRichiesta("get", URL);
    request.fail(error);
    request.done(function (domande) {
        console.log(domande);
       let _tbody=$("tbody");
       for(let i=0;i<domande.length;i++)
       {

           let _tr=$("<tr>");
           let _td=$("<td>");
           _td.text(domande[i].domanda);
           _td.appendTo(_tr);
           _tr.appendTo(_tbody);


       }
    });

});

function aggiungiDomanda(){
    //console.log($("#txtDomanda").val());
    let dom=$("#txtDomanda").val();
    let request=inviaRichiesta("post", "http://localhost:8080/2025_26/4EINF/esOnlitestConAsincrono/php/setDomanda.php", {domanda: dom});
    request.done(function (result) {
        alert(result);
        window.location.href = "index.html";
    });
    request.fail(error);
}


