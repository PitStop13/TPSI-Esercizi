"use strict"

function evidenzia(par) {
    $("#wrapper").children().css("background-color", "white");
    $("#wrapper").children(par).css("background-color", "green");

}

$(document).ready(function () {
    //Button 1
    $("#btn1").click(function () {
        let nElementi;
        nElementi = $("#wrapper").children("li").length;
        alert(nElementi);
    });

    $("#btn2").click(function () {
        let list = $("#wrapper").children("li");
        let msg = "";
        //Soluzione 1
        for (let i = 0; i < list.length; i++) {
            msg += list.eq(i).text();
        }

        //Soluzione 2
        for (let item of list) {
            msg += $(item).text();
        }

        //Soluzione 3
        list.each(function (i) {
            msg += list.eq(i).text();
        })
        alert(msg);
    });

    $("#btn3").click(function () {
        let li = $("#wrapper").children("li",":nth-child(even)");
        let msg = "";
        li.each(function (i) {
            msg += list.eq(i).text();
        })
        alert(msg)
    });
});