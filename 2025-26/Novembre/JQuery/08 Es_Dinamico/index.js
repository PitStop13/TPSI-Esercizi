"use strict";
let _menu = []; //0-> menu 1 e in pos 1-> menu 2
$(document).ready(function () {
    $("div ul").each(function (index, element) {
        _menu[index] = $(element); //carico in un vettore le due UL
    });
});

function aggiungi(pos) {
    let li = $("<li>");
    let length = _menu[pos - 1].children().length;
    length++;
    li.text("menu " + pos + " voce " + length);
    _menu[pos - 1].append(li);
}

function sposta(pos) { //sposta da menu 1 a menu 2 e da menu 2 a menu 1
    if (_menu[pos - 1].children().length > 0) {
        let li = _menu[pos - 1].children().last();
        if (pos == 1) {
            li.appendTo(_menu[1]);
        }
        else {
            li.appendTo(_menu[0]);
        }
    }
}

function nuovo(pos) {
}

function replica(pos) {
}
