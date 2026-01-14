$(document).ready(function () {
    // 1. CREAZIONE DINAMICA UI
    $("<div>").addClass("header").appendTo("body");
    $("<h1>").text("Simon Says - Sequenza Magica").appendTo(".header");

    const $gameInfo = $("<div>").addClass("game-info").appendTo("body");
    $gameInfo.append(
        $("<div>").addClass("info-box").html('Livello: <span id="level">0</span>'),
        $("<div>").addClass("info-box").html('Punti: <span id="score">0</span>')
    );

    const $container = $("<div>").addClass("game-container").appendTo("body");
    // Creiamo i 4 pad con ID diversi
    const buttonColors = ["green", "red", "yellow", "blue"];
    buttonColors.forEach(color => {
        $("<div>").addClass("pad").attr("id", color).appendTo($container);
    });

    $("<button>").attr("id", "btnStart").text("Inizia Gioco").appendTo("body");


    // 2. LOGICA DI GIOCO
    let gamePattern = [];
    let userClickedPattern = [];
    let level = 0;
    let started = false;

    // Gestione Pulsante Start
    $("#btnStart").on("click", function () {
        if (!started) {
            $("#btnStart").fadeOut();
            nextSequence();
            started = true;
        }
    });

    // Funzione per generare il prossimo colore
    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level").text(level);
        $("#score").text((level - 1) * 10);

        const randomNumber = Math.floor(Math.random() * 4);
        const randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        // RIPRODUZIONE SEQUENZA CPU
        // Usiamo un timeout per distanziare le illuminazioni
        let i = 0;
        const playLoop = setInterval(() => {
            flashButton(gamePattern[i]);
            i++;
            if (i >= gamePattern.length) {
                clearInterval(playLoop);
            }
        }, 600);
    }

    // Gestione Click Utente
    $(".pad").on("click", function () {
        if (!started) return;

        const userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        flashButton(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });

    // Controllo Risposta
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            // Se ha completato correttamente tutta la sequenza
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        } else {
            // ERRORE: GAME OVER
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);

            alert("SBAGLIATO! Il tuo punteggio finale: " + $("#score").text());
            startOver();
        }
    }

    // Funzione di Animazione Flash
    function flashButton(color) {
        $("#" + color).addClass("pressed");
        setTimeout(() => {
            $("#" + color).removeClass("pressed");
        }, 300);
    }

    // Reset del Gioco
    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
        $("#btnStart").fadeIn().text("Riprova");
        $("#level").text(0);
        $("#score").text(0);
    }
});
