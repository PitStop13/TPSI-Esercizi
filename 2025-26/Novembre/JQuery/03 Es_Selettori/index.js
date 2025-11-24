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
        $("#div").addClass("evidenziato");

    });
    _showSpecial.click(function () {
        $("#output").text($("#speciale").text());
    });
    _reset.click(function () {
        $("#output").text("Results...");
        $("div").removeClass("evidenziato");
    });


});
