"use strict"

function evidenzia(par) {
    //Pulisco tutto in modo da cancellare i colori precedenti
    $("#wrapper").children("li").css("color", "black");
    $("#wrapper").children().css("background-color", "white");
    $("#wrapper").children(par).css("background-color", "yellow");
}

$(document).ready(function () {
    //Button 1
    $("#btn1").click(function () {
        alert($("#wrapper").children("li").length);
    });

    //Button2
    $("#btn2").click(function () {
        let list = $("#wrapper").children("li");
        let msg = "";

        //Soluzione1
        for (let i = 0; i < list.length; i++)
            msg += list.eq(i).text();

        //Soluzione2
        for (let item of list)
            msg += $(item).text();

        //Soluzione3
        list.each(function (i) {
            msg += list.eq(i).text();
        })

        alert(msg);
    });


    //Button3
    $("#btn3").click(function () {
        let li = $("#wrapper").children("li").filter(":nth-child(even)");
        let msg = "";
        li.each(function (i, ref) {
            msg += $(ref).text();
        });
        alert(msg);
    });

    $("#btn4").click(function () {
        let li = $("#wrapper").children("li").filter(":nth-child(odd)");
        li.each(function (i, ref) {
            $(ref).css("color", "green");
        });
    });

    $("#btn5").click(function () {
        //Soluzione 1
        /*let li = $("#wrapper").children("li");
        li.each(function (i, ref) {
            if (i >= 1 && i <= 6)
                $(ref).css("color", "green");
        });*/
        //Soluzione 2
        //$("#wrapper").children("li").filter(":nth-child(n+2)").filter(":nth-child(-n+7)").css("color", "green");
        //Soluzione 3 con slice
        $("#wrapper").children("li").slice(1, 7).css("color", "green");
    });

    $("#btn6").click(function () {
        $("#wrapper").children("li").css("color", "black", "background-color", "white");
    });
});