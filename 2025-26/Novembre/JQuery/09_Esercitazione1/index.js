$(document).ready(function () {
    let _body = $("body");
    let _campo = $("<div>");
    _campo.prop("id", "campo");

    _body.append(_campo);

    let _portiere = $("<img>").prop("id", "portiere").prop("src", "./img/Portiere.png").prop("id", "portiere");
    _campo.append(_portiere);

    let _palla = $("<img>").prop("id", "palla").prop("src", "./img/Palla.png").prop("id", "palla");
    _campo.append(_palla);

    //Creo 4 bottoni in basso a sx si chiamano (sinistra,centro,destra,ricarica)
    let _sinistra = $("<button>").prop("id", "sinistra").text("Sinistra");
    let _centro = $("<button>").prop("id", "centro").text("Centro");
    let _destra = $("<button>").prop("id", "destra").text("Destra");
    let _ricarica = $("<button>").prop("id", "ricarica").text("Ricarica");
    _campo.append(_sinistra);
    _campo.append(_centro);
    _campo.append(_destra);
    _campo.append(_ricarica);

    _sinistra.click(function () {
        _palla.animate({
            'left': '550px',
            'bottom': '300px',
        });

    });
    _centro.click(function () {
        _palla.animate({
            'bottom': '300px',
        });
    });
    _destra.click(function () {
        _palla.animate({
            'left': '1450px',
            'bottom': '300px',
        });
    });

    _ricarica.click(function () {
        const POS_INIZIALE_LEFT = "50%"; // Corrisponde al 50% dal CSS
        const POS_INIZIALE_BOTTOM = "5%"; // Corrisponde al 5% dal CSS
        _palla.stop(true, true); // Interrompe qualsiasi animazione in corso
        _palla.css({
            'bottom': POS_INIZIALE_BOTTOM,
            'left': POS_INIZIALE_LEFT,
        });
    });

})