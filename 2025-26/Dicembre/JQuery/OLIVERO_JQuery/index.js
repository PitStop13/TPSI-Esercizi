
$(document).ready(function () {
    $("<h1>").prop("id", "Titolo").text("Gestione Scaffali Magazzino").appendTo("body");

    // $("<select>").prop("id", "selezione").appendTo("body");
    // $("select").append($("<option>").val("0").text("Seleziona Operazione"));
    // $("select").append($("<option>").val("1").text("aggiungi pacco a scaffale A"));
    // $("select").append($("<option>").val("2").text("aggiungi pacco a scaffale B"));
    // $("select").append($("<option>").val("3").text("Sposta Ultimo pacco da A a B"));
    // $("select").append($("<option>").val("4").text("Sposta Ultimo pacco da B a A"));
    // $("select").append($("<option>").val("5").text("Inserisci pacco in testa a A"));
    // $("select").append($("<option>").val("6").text("Inserisci pacco dopo il primo B"));
    // $("select").append($("<option>").val("7").text("Duplica pacchi scaffale A"));
    // $("select").append($("<option>").val("8").text("Duplica pacchi scaffale B"));
    // $("select").append($("<option>").val("9").text("Evidenzia pacchi PARI"));
    // $("select").append($("<option>").val("10").text("Evidenzia pacchi DISPARI"));
    // $("select").append($("<option>").val("11").text("Svuota scaffale A"));
    // $("select").append($("<option>").val("12").text("Svuota scaffale B"));
    // $("select").append($("<option>").val("13").text("Conta pacchi totali"));
    // $("select").append($("<option>").val("14").text("Ordina pacchi scaffale A"));
    // $("select").append($("<option>").val("15").text("Ordina pacchi scaffale B"));

    $("<div>").prop("id", "selezione").appendTo("body");
    $("#selezione").append($("<h4>").prop("id", "0").text("Seleziona Operazione"));
    $("#selezione").append($("<h4>").prop("id", "1").text("aggiungi pacco a scaffale A"));
    $("#selezione").append($("<h4>").prop("id", "2").text("aggiungi pacco a scaffale B"));
    $("#selezione").append($("<h4>").prop("id", "3").text("Sposta Ultimo pacco da A a B"));
    $("#selezione").append($("<h4>").prop("id", "4").text("Sposta Ultimo pacco da B a A"));
    $("#selezione").append($("<h4>").prop("id", "5").text("Inserisci pacco in testa a A"));
    $("#selezione").append($("<h4>").prop("id", "6").text("Inserisci pacco dopo il primo B"));
    $("#selezione").append($("<h4>").prop("id", "7").text("Duplica pacchi scaffale A"));
    $("#selezione").append($("<h4>").prop("id", "8").text("Duplica pacchi scaffale B"));
    $("#selezione").append($("<h4>").prop("id", "9").text("Evidenzia pacchi PARI"));
    $("#selezione").append($("<h4>").prop("id", "10").text("Evidenzia pacchi DISPARI"));
    $("#selezione").append($("<h4>").prop("id", "11").text("Svuota scaffale A"));
    $("#selezione").append($("<h4>").prop("id", "12").text("Svuota scaffale B"));
    $("#selezione").append($("<h4>").prop("id", "13").text("Conta pacchi totali"));
    $("#selezione").append($("<h4>").prop("id", "14").text("Ordina pacchi scaffale A"));
    $("#selezione").append($("<h4>").prop("id", "15").text("Ordina pacchi scaffale B"));

    //Creo gli scaffali
    let cont = 0;

    $("<div>").prop("id", "area").appendTo("body");
    $("#area").append($("<div>").addClass("scaffale").prop("id", "scaffale1"));
    $("#area").append($("<div>").addClass("scaffale").prop("id", "scaffale2"));
    for (let i = 0; i < 4; i++) {
        cont++;
        $("#scaffale1").append($("<div>").addClass("pacco").text("PK-" + cont));
    }
    for (let j = 0; j < 4; j++) {
        cont++;
        $("#scaffale2").append($("<div>").addClass("pacco").text("PK-" + cont));
    }


    $("#1").on("click", function () {
        cont++
        $("#scaffale1").append($("<div>").addClass("pacco").text("PK-" + cont));

    })
    $("#2").on("click", function () {
        cont++
        $("#scaffale2").append($("<div>").addClass("pacco").text("PK-" + cont));
    })
    $("#3").on("click", function () {
        $("#scaffale2").prepend(nuovoDiv); // Mette all'inizio
        let temp = $("#scaffale1").children().last();
        $("#scaffale1").children().eq(0) = temp;

    })
    $("#4").on("click", function () {
        console.log("1")
    })
    $("#5").on("click", function () {
        cont++;
        $("#scaffale1").prepend($("<div>").addClass("pacco").text("PK-" + cont)); // Mette all'inizio
    })
    $("#6").on("click", function () {
        console.log("1")
    })
    $("#7").on("click", function () {

        let cont1 = $("#scaffale1").children().get();

        for (let i = 0; i < cont1; i++) {
            cont++;
            $("#scaffale1").append($("<div>").addClass("pacco").text("PK-" + cont));
        }


    })
    $("#8").on("click", function () {
        let cont2 = $("#scaffale2").children().get();

        for (let i = 0; i < cont2; i++) {
            cont++;
            $("#scaffale2").append($("<div>").addClass("pacco").text("PK-" + cont));
        }
    })
    $("#9").on("click", function () {
        evidenzia('.pacco:nth-child(even)')
    })
    $("#10").on("click", function () {
        evidenzia('.pacco:nth-child(odd)')
    })
    $("#11").on("click", function () {
        $("#scaffale1").empty()
    })
    $("#12").on("click", function () {
        $("#scaffale2").empty()
    })
    $("#13").on("click", function () {
        alert("Numero di pacchi: " + cont);
    })
    $("#14").on("click", function () {
        let scaf1 = $("#scaffale1").children().get()

        scaf1.sort(function (a, b) {
            return (parseInt($(a).text().split("-")[1]) - parseInt($(b).text().split("-")[1]));
        });

        $("#scaffale1").empty().append(scaf1);
    })
    $("#15").on("click", function () {
        let scaf2 = $("#scaffale2").children().get()

        scaf2.sort(function (a, b) {
            return (parseInt($(a).text().split("-")[1]) - parseInt($(b).text().split("-")[1]));
        });

        $("#scaffale2").empty().append(scaf2);
    })

    function evidenzia(par) {

        $("#scaffale1").children(par).css("background-color", "yellow");
        $("#scaffale2").children(par).css("background-color", "yellow");

    }





    //Provo a recuperare il value
    //onChange

    // $("#selezione").get().onchange(function(){
    //     console.log($(this).val());
    // });

});