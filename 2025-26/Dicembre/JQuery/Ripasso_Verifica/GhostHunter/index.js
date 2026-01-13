$(document).ready(function () {
    // 1. Creazione Dinamica UI (stile Acchiappa la Talpa)
    $("<div>").addClass("header").appendTo("body");
    $("<h1>").text("Ghost Hunter - Il Castello Stregato").appendTo(".header");

    const $gameInfo = $("<div>").addClass("game-info").appendTo("body");
    $gameInfo.append(
        $("<div>").addClass("info-box").html('Fantasmi Scacciati: <span id="punti">0</span>'),
        $("<div>").addClass("info-box").html('Tempo Rimasto: <span id="timer">30</span>s'),
        $("<button>").attr("id", "btnStart").addClass("btn").text("Inizia la Caccia")
    );

    $("<div>").attr("id", "arena").appendTo("body");

    // Variabili di gioco
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let spawnInterval;

    // 2. Logica Pulsante Start
    $("#btnStart").on("click", function () {
        startGame();
    });

    function startGame() {
        score = 0;
        timeLeft = 30;
        $("#punti").text(score);
        $("#timer").text(timeLeft);
        $("#btnStart").prop("disabled", true);
        $("#arena").empty();

        // Timer del gioco (30 secondi)
        gameInterval = setInterval(() => {
            timeLeft--;
            $("#timer").text(timeLeft);
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        // Loop di comparsa fantasmi
        spawnInterval = setInterval(() => {
            spawnGhost();
        }, 1200);
    }

    // 3. Funzione Comparsa Fantasma (Fai attenzione ai fadeIn/fadeOut)
    function spawnGhost() {
        const arenaWidth = $("#arena").width();
        const arenaHeight = $("#arena").height();

        // Calcolo posizione casuale
        let x = Math.floor(Math.random() * (arenaWidth - 60));
        let y = Math.floor(Math.random() * (arenaHeight - 60));

        // Creazione dinamica del fantasma
        let $ghost = $("<div>").addClass("ghost").css({
            "left": x + "px",
            "top": y + "px",
            "display": "none" // Indispensabile per il fadeIn
        });

        $("#arena").append($ghost);

        // EFFETTO FADE IN
        $ghost.fadeIn(800);

        // Se non viene cliccato, sparisce dopo un po'
        let ghostLife = setTimeout(() => {
            $ghost.fadeOut(800, function () {
                $(this).remove();
            });
        }, 2000);

        // 4. Gestione Click Fantasma
        $ghost.on("click", function () {
            // Fermo i timer e le animazioni del fantasma
            clearTimeout(ghostLife);
            $(this).stop(); // Interrompe il fadeIn o il fadeOut in corso

            // Incremento punti
            score++;
            $("#punti").text(score);

            // EFFETTO DI SPARIZIONE (SlideUp per variare un po')
            $(this).slideUp(200, function () {
                $(this).remove();
            });
        });
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        $("#btnStart").prop("disabled", false);
        alert("TEMPO SCADUTO!\nHai scacciato " + score + " fantasmi!");
    }
});
