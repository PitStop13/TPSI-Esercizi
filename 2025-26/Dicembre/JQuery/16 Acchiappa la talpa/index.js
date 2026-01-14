$(document).ready(function () {
    $("<div>").addClass("header").appendTo("body");
    $("<h1>").text("Acchiappa la talpa").appendTo(".header");

    $("<div>").addClass("container").appendTo("body");
    $("<div>").prop({ "id": "game-board", "class": "grid-container" }).appendTo(".container");

    // Generazione dinamica game-info (Punti, Tempo, Bottone)
    const $gameInfo = $("<div>").addClass("game-info flex-center gap-2 m-b-2").appendTo("body");
    $gameInfo.append(
        $("<div>").addClass("info-box").html('Punti: <span id="punti">0</span>'),
        $("<div>").addClass("info-box").html('Tempo: <span id="timer">30</span>s'),
        $("<div>").addClass("info-box").html('Dimensione: <select id="dimensione"><option value="3">3x3</option><option value="4">4x4</option><option value="5">5x5</option></select>'),
        $("<button>").attr("id", "btnStart").addClass("btn").text("Inizia Gioco")
    );

    $("#btnStart").on("click", function () {
        let dim = $("#dimensione").val();
        console.log(dim);

        creaTabellaDinamica(dim, dim);
        $("#btnStart").prop("disabled", true);
        let time = 30;
        let timer = setInterval(() => {
            if (time > 0) {
                time--;
                $("#timer").text(time);

            } else {
                finiscipartita();
            }
        }, 1000);


        let fuori = setInterval(() => {
            let rnd = Math.floor(Math.random() * (dim * dim));

            $("#" + rnd).addClass("active");

            setTimeout(function () {
                $("#" + rnd).removeClass("active");
            }, 800);

        }, 1000);

        $(".grid-item").on("click", function () {

            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                //$(this).addClass("hit");
                $(this).animate({ "padding": "20px" }, 50)
                    .animate({ "padding": "10px" }, 50);

                // setTimeout(() => {
                //     $(this).removeClass("hit");
                // }, 100);
                let punti = $("#punti").text();
                punti++;
                $("#punti").text(punti);
            }
        });

        function finiscipartita() {
            $("#btnStart").prop("disabled", false);
            alert("HAI TOTALIZZATO: " + $("#punti").text() + " PUNTI !!!")
            clearInterval(timer);
            clearInterval(fuori);
            $("#punti").text(0);
            time = 30;
            $("#timer").text(time);
            $("#game-board").empty();

        };

    });

    function creaTabellaDinamica(righe, colonne) {
        const $container = $("#game-board");
        $container.empty();

        const $table = $("<table></table>");
        $table.css({
            "margin": "0 auto",
            "border-collapse": "collapse"
        });

        let cont = 0;
        for (let i = 0; i < righe; i++) {
            const $row = $("<tr></tr>");
            for (let j = 0; j < colonne; j++) {
                const $cell = $("<td></td>")
                    .addClass("grid-item")
                    .attr("id", cont);

                // Impostiamo la dimensione fissa da JS
                $cell.css({
                    "width": "100px",
                    "height": "100px",
                    "border": "1px solid #000000ff",
                    "cursor": "pointer",
                    "text-align": "center",
                    "vertical-align": "middle",
                    "padding": "10px",
                    "border-radius": "12px"
                });

                $row.append($cell);
                cont++;
            }
            $table.append($row);
        }
        $container.append($table);
    }
});
