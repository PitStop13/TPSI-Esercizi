"use strict";

$(document).ready(function () {
    for (let i = 0; i < 36; i++) {
        let box = $("<div>");
        box.addClass("box");

        $("#wrapper").append(box);
    }
    changeColor();
});

function changeColor() {
    let rnd = Math.floor(36 * Math.random());
    $(".box").eq(rnd)
        .animate({ "opacity": "0.3" }, 400)
        .animate({ "opacity": "0.6" }, 400)
        .animate({ "opacity": "0.1" }, 400);
    setTimeout(function () { changeColor(); }, 30);
}
