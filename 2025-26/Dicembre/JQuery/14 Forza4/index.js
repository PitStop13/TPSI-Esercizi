const righe = 6;
const colonne = 7;
$(document).ready(function () {
    $("<h1>").text("Gioco del 4").appendTo("body");
    $("<div>").attr("id", "header").appendTo("body");
    $("<div>").attr("id", "wrapper").appendTo("body");

    let header = $("#header");
    let wrapper = $("#wrapper");

    creaTabellaDinamica(righe, colonne);

    for (let i = 0; i < colonne; i++) {
        let pedina = $("<div>").addClass("pedina").prop("id", "pedina-" + i);
        header.append(pedina);
    }

    function creaTabellaDinamica(righe, colonne) {
        const $wrapper = $("#wrapper");
        $wrapper.empty();
        for (let i = 0; i < righe; i++) {
            for (let j = 0; j < colonne; j++) {
                const $pedina = $("<div>")
                    .addClass("pedina")
                    .attr("id", "pedina-" + i + "-" + j);
                $wrapper.append($pedina);
            }
        }
    }

    let turno = true;
    header.children("div").on("mouseover", mouseOver);
    function mouseOver() {
        if (turno) {
            $(this).addClass("rosso");
            $(this).removeClass("giallo");

        }
        else {
            $(this).addClass("giallo");
            $(this).removeClass("rosso");
        }

    }
    header.children("div").on("mouseout", mouseOut);
    function mouseOut() {
        $(this).removeClass("rosso");
        $(this).removeClass("giallo");
    }

    header.children("div").on("click", mouseClick);

    function mouseClick() {
        if (turno) {
            $(this).addClass("rosso");
            let colPrimaRiga = parseInt($(this).prop("id").split("-")[1]);
            console.log(colPrimaRiga);

            let cont = 0;
            let interval = setInterval(() => {

                let colPedina = $("#pedina-" + cont + "-" + colPrimaRiga).prop("id");
                $("#" + colPedina).addClass("rosso");

                if (cont > 0) {
                    let pedinaPrecedente = $("#pedina-" + (cont - 1) + "-" + colPrimaRiga).prop("id");
                    $("#" + pedinaPrecedente).removeClass("rosso");
                }

                let cellaSotto = $("#pedina-" + (cont + 1) + "-" + colPrimaRiga);
                let occupataSotto = cellaSotto.hasClass("giallo") || cellaSotto.hasClass("rosso");

                if (cont == righe - 1 || occupataSotto) {
                    clearInterval(interval);
                }
                else {
                    cont++;
                }
            }, 100);
        }
        else {
            $(this).addClass("giallo");
            let colPrimaRiga = parseInt($(this).prop("id").split("-")[1]);
            console.log(colPrimaRiga);

            let cont = 0;
            let interval = setInterval(() => {

                let colPedina = $("#pedina-" + cont + "-" + colPrimaRiga).prop("id");
                $("#" + colPedina).addClass("giallo");

                if (cont > 0) {
                    let pedinaPrecedente = $("#pedina-" + (cont - 1) + "-" + colPrimaRiga).prop("id");
                    $("#" + pedinaPrecedente).removeClass("giallo");
                }

                let cellaSotto = $("#pedina-" + (cont + 1) + "-" + colPrimaRiga);
                let occupataSotto = cellaSotto.hasClass("giallo") || cellaSotto.hasClass("rosso");

                if (cont == righe - 1 || occupataSotto) {
                    clearInterval(interval);
                }
                else {
                    cont++;
                }
            }, 100);
        }
        turno = !turno;
    }

});