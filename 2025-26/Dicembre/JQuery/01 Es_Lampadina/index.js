"use strict"
let lampadina;
let btnSpegni;
let btnAccendi;

$(document).ready(function () { //------------->Metodo per caricare la pagina con JQuery
    btnSpegni = $("#btnSpegni").on("click", spegni);
    btnAccendi = $("#btnAccendi").on("click", accendi);
    lampadina = $(".lampadina");
    btnSpegni.hide();
    lampadina.hide();

    let descrizione = {
        "width": "160px",
        "height": "40px",
        "text-align": "center",
        "lineHeight": "40px",
        "backgroundColor": "#aaa",
        "textDecoration": "underline",
        "fontSize": "14pt",
        "cursor": "pointer",
        "borderRadius": "10px"
    }
    let _descrizione = $("#descrizione");
    _descrizione.css(descrizione);

    let _contenuto = $("#contenuto"); // ------>Contiene una collection di riferimenti,in questo caso è richimata  volta quindi la collection è solo di 1,tipo querySelectorAll()
    _contenuto.css("width", "600px");
    _contenuto.css("border", "1px solid black");
    _contenuto.css({
        "backgroundColor": "#ffd",
        "padding": "5px",
        "margin": "5px"
    });

    _contenuto.hide();
    // _descrizione.on("mouseover",function(){
    //     _contenuto.slideDown(800);
    // })
    // _descrizione.mouseout(function () { 
    //     _contenuto.slideUp(800);
    // }); ------->Crea un problemino che proviamo a risolvere con le cose sotto

    _descrizione.on("mouseover", function () {
        visualizzaContenuto();
    });

    _descrizione.on("mouseout", function () {
        _contenuto.slideUp(800, function () {
            // Quando l'animazione di chiusura è finita, riattivo l'hover
            _descrizione.on("mouseover", visualizzaContenuto);
        });
        console.log("Contenuto nascosto");
    });

    function visualizzaContenuto() {
        _contenuto.slideDown(800);
        // Rimuovo temporaneamente l'evento mouseover per evitare doppi trigger
        _descrizione.off("mouseover");
        console.log("Contenuto visualizzato");
    }

});


function accendi() {
    // Questo mostra la lampadina e il bottone giusto.
    // lampadina.show();
    // btnAccendi.hide();
    // btnSpegni.show();

    //Questo accende la lampadina
    lampadina.addClass("accesa");
    lampadina.fadeIn(1000, function () { //----------->mostra la roba pian piano
        btnAccendi.hide();
        btnSpegni.show();
    });
}

function spegni() {
    // Questo nasconde la lampadina e il bottone giusto.
    // lampadina.hide();
    // btnSpegni.hide();
    // btnAccendi.show();

    //Questo spegne la lampadina
    lampadina.removeClass("accesa");
    lampadina.fadeOut(1000, function () { //----------->mostra la roba pian piano
        btnAccendi.show();
        btnSpegni.hide();
    });
}