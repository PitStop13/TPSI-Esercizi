$(document).ready(function () {
    $("#btnOrdina").click(function () {
        //let studenti = $("#listaStudenti").children().eq(2).text();
        //let studenti = $("#listaStudenti").children().get();
        let studenti = [];
        $("#listaStudenti").children().each(function (index) {
            console.log("Voce n. " + index + " ha testo: " + $(this).text());
            if (index === 2) {
                $(this).css("color", "red");
            }
            studenti.push($(this).text());
        });
        for(let i = 0; i < studenti.length; i++) {
            console.log(studenti[i]);
        }
        // console.log(studenti);

        // studenti.sort(function (a, b) {
        //     return (parseInt($(a).text().split("-")[1]) - parseInt($(b).text().split("-")[1]));
        // });

        // $("#listaStudenti").empty().append(studenti);
    });
});