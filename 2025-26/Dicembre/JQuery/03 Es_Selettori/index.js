"use strict"
let _countP
let _colorDiv
let _showSpecial
let _reset

$(document).ready(function () {

    _countP = $("#countP");
    _colorDiv = $("#colorDiv");
    _showSpecial = $("#showSpecial");
    _reset = $("#reset");

    _countP.click(function () {
        $("#output").text($("p").length);
    });

    _colorDiv.click(function () {
        $(".box").addClass("evidenziato");
        $("#output").text("Evidenziato");
    });
    _showSpecial.click(function () {
        $("#output").text($("#speciale").text());
    });
    _reset.click(function () {
        $("#output").text("Risultati...");
        $(".box").removeClass("evidenziato");
    });

});
