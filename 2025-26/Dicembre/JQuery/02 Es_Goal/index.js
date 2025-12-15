"use strict";
$(document).ready(function () {
    let _calciatore = $("#calciatore");
    let _palla = $("#palla");

    _calciatore.hide();
    $("#esci").css("visibility", "hidden");
    $("#fadeOut").css("visibility", "hidden");

    $("#entra").click(function () {
        //Visualizzazione con dissolvenza parziale
        _calciatore.show(800);
        $("#entra").css("visibility", "hidden");
        $("#esci").css("visibility", "visible");
    })

    $("#esci").click(function () {
        //Visualizzazione con dissolvenza parziale
        _calciatore.hide(800);
        $("#entra").css("visibility", "visible");
        $("#esci").css("visibility", "hidden");
    });

    $("#fadeIn").click(function () {
        //Dissolvenza completa
        _calciatore.fadeIn(2000);
        $("#fadeIn").css("visibility", "hidden");
        $("#fadeOut").css("visibility", "visible");
    });

    $("#fadeOut").click(function () {
        //Dissolvenza completa
        _calciatore.fadeOut(2000);
        $("#fadeIn").css("visibility", "visible");
        $("#fadeOut").css("visibility", "hidden");
    });



    $("#slideUp").click(function () {
        //Transizione con visualizzazione verso l'alto
        _palla.slideUp(1000);
    });
    $("#slideDown").click(function () {
        //Transizione con visualizzazione verso il basso
        _palla.slideDown(1000);
    });

    $("#tira").click(function(){
        _palla.animate({left: "1025px",top : "300px" ,width :"50px",height:"50px"}, 1500 ,function(){
            alert("Gooooooool")
        });
    })


    $("#giallo").click(function(){
        //assegnazione di un valore a aun attributo html
        _palla.prop("src","img/PalloneGiallo.jpg");
    })
    $("#rosso").click(function(){
        //assegnazione di un valore a aun attributo html
        _palla.prop("src","img/PalloneRosso.jpg");
    })
});
