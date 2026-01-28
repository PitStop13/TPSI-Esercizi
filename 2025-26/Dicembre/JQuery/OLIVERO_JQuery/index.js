
$(document).ready(function () {
    $("<h1>").prop("id", "Titolo").text("Gestione Scaffali Magazzino").appendTo("body");

    let $container = $("<div>").prop("id", "selezione-container").appendTo("body");
    $container.append($("<h3>").text("Seleziona un'operazione"));

    let $select = $("<select>").prop("id", "selezione").appendTo($container);
    $select.append($("<option>").val("0").text("--- Scegli Operazione ---"));
    $select.append($("<option>").val("1").text("Aggiungi pacco a scaffale A"));
    $select.append($("<option>").val("2").text("Aggiungi pacco a scaffale B"));
    $select.append($("<option>").val("3").text("Sposta Ultimo pacco da A a B"));
    $select.append($("<option>").val("4").text("Sposta Ultimo pacco da B a A"));
    $select.append($("<option>").val("5").text("Inserisci pacco in testa a A"));
    $select.append($("<option>").val("6").text("Inserisci pacco dopo il primo B"));
    $select.append($("<option>").val("7").text("Duplica pacchi scaffale A"));
    $select.append($("<option>").val("8").text("Duplica pacchi scaffale B"));
    $select.append($("<option>").val("9").text("Evidenzia pacchi PARI"));
    $select.append($("<option>").val("10").text("Evidenzia pacchi DISPARI"));
    $select.append($("<option>").val("11").text("Svuota scaffale A"));
    $select.append($("<option>").val("12").text("Svuota scaffale B"));
    $select.append($("<option>").val("13").text("Conta pacchi totali"));
    $select.append($("<option>").val("14").text("Ordina pacchi scaffale A"));
    $select.append($("<option>").val("15").text("Ordina pacchi scaffale B"));

    // Creo gli scaffali
    let cont = 0;

    $("<div>").prop("id", "area").appendTo("body");

    let $scaf1 = $("<div>").addClass("scaffale").prop("id", "scaffale1").appendTo("#area");
    $scaf1.append($("<h3>").text("Scaffale A"));

    let $scaf2 = $("<div>").addClass("scaffale").prop("id", "scaffale2").appendTo("#area");
    $scaf2.append($("<h3>").text("Scaffale B"));

    function getRandomColor() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 30) + 60; // 60-90% saturation
        const l = Math.floor(Math.random() * 20) + 40; // 40-60% lightness (better for white text)
        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    function createPacco() {
        cont++;
        return $("<div>")
            .addClass("pacco")
            .text("PK-" + cont)
            .css("background-color", getRandomColor());
    }

    // Inizializzazione
    for (let i = 0; i < 4; i++) {
        $scaf1.append(createPacco());
        $scaf2.append(createPacco());
    }

    $select.on("change", function () {
        let op = $(this).val();

        // Rimuovo evidenziazioni precedenti per pulizia
        $(".pacco").removeClass("highlight").css("border", "none");

        switch (op) {
            case "1": // Aggiungi pacco a scaffale A
                $scaf1.append(createPacco());
                break;
            case "2": // Aggiungi pacco a scaffale B
                $scaf2.append(createPacco());
                break;
            case "3": // Sposta Ultimo pacco da A a B
                let lastA = $scaf1.find(".pacco").last();
                if (lastA.length) $scaf2.append(lastA);
                break;
            case "4": // Sposta Ultimo pacco da B a A
                let lastB = $scaf2.find(".pacco").last();
                if (lastB.length) $scaf1.append(lastB);
                break;
            case "5": // Inserisci pacco in testa a A
                $scaf1.find("h3").after(createPacco());
                break;
            case "6": // Inserisci pacco dopo il primo B
                let firstB = $scaf2.find(".pacco").first();
                if (firstB.length) {
                    firstB.after(createPacco());
                } else {
                    $scaf2.append(createPacco());
                }
                break;
            case "7": // Duplica pacchi scaffale A
                let pacchiA = $scaf1.find(".pacco").length;
                for (let i = 0; i < pacchiA; i++) {
                    $scaf1.append(createPacco());
                }
                break;
            case "8": // Duplica pacchi scaffale B
                let pacchiB = $scaf2.find(".pacco").length;
                for (let i = 0; i < pacchiB; i++) {
                    $scaf2.append(createPacco());
                }
                break;
            case "9": // Evidenzia pacchi PARI
                $(".pacco").each(function () {
                    let num = parseInt($(this).text().split("-")[1]);
                    if (num % 2 === 0) $(this).addClass("highlight");
                });
                break;
            case "10": // Evidenzia pacchi DISPARI
                $(".pacco").each(function () {
                    let num = parseInt($(this).text().split("-")[1]);
                    if (num % 2 !== 0) $(this).addClass("highlight");
                });
                break;
            case "11": // Svuota scaffale A
                $scaf1.find(".pacco").remove();
                break;
            case "12": // Svuota scaffale B
                $scaf2.find(".pacco").remove();
                break;
            case "13": // Conta pacchi totali
                let total = $(".pacco").length;
                alert("Numero totale di pacchi nel magazzino: " + total);
                break;
            case "14": // Ordina pacchi scaffale A
                sortShelf($scaf1);
                break;
            case "15": // Ordina pacchi scaffale B
                sortShelf($scaf2);
                break;
        }

        // Resetta la select dopo l'operazione
        $(this).val("0");
    });

    function sortShelf($shelf) {
        let items = $shelf.find(".pacco").get();
        items.sort(function (a, b) {
            let valA = parseInt($(a).text().split("-")[1]);
            let valB = parseInt($(b).text().split("-")[1]);
            return valA - valB;
        });

        // Rimuovo i pacchi e li reinserisco dopo l'H3
        let $h3 = $shelf.find("h3");
        $shelf.find(".pacco").remove();
        $shelf.append(items);
    }
});
