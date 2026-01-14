$(document).ready(function () {
    $("#btnOrdina").click(function () {
        let studenti = $("#listaStudenti").children().get();

        studenti.sort(function (a, b) {
            return (parseInt($(a).text().split("-")[1]) - parseInt($(b).text().split("-")[1]));
        });

        $("#listaStudenti").empty().append(studenti);
    });
});