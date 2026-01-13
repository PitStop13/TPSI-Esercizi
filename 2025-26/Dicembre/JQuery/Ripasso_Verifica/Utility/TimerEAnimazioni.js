/**
 * GESTIONE TIMER E ANIMAZIONI CSS DINAMICHE
 */

$(document).ready(function () {

    // --- 1. GESTIONE TIMER (Countdown) ---
    let timerID = null;
    let secondi = 30;

    function startTimer() {
        if (timerID !== null) return; // Evita duplicati

        timerID = setInterval(function () {
            secondi--;
            $("#timer-display").text("Tempo: " + secondi + "s");

            if (secondi <= 0) {
                stopTimer();
                alert("Tempo Scaduto!");
                // Azione di fine gioco...
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerID);
        timerID = null;
    }

    function resetTimer(nuovoTempo) {
        stopTimer();
        secondi = nuovoTempo;
        $("#timer-display").text("Tempo: " + secondi + "s");
    }


    // --- 2. ANIMAZIONI CSS VIA JQUERY ---
    // Esempio: far tremare un elemento (effetto errore)
    function shakeElement($el) {
        $el.css("position", "relative");
        for (let i = 0; i < 3; i++) {
            $el.animate({ left: "-10px" }, 50)
                .animate({ left: "10px" }, 50)
                .animate({ left: "0px" }, 50);
        }
    }

    // Esempio: evidenziatore temporaneo
    function highlight($el) {
        const originalBg = $el.css("background-color");
        $el.css("background-color", "#ffff99");
        setTimeout(() => {
            $el.css("background-color", originalBg);
        }, 1000);
    }


    // --- 3. BARRA DI PROGRESSO ---
    function updateProgress(percentuale) {
        $("#progress-bar").animate({
            width: percentuale + "%"
        }, 400);
    }


    // --- 4. GESTIONE SCORE / PUNTEGGIO ---
    let score = 0;
    function updateScore(punti) {
        score += punti;
        // Effetto "pop" sul testo del punteggio
        $("#score-display")
            .text("Punti: " + score)
            .css("transform", "scale(1.2)")
            .animate({ opacity: 1 }, 100, function () {
                $(this).css("transform", "scale(1)");
            });
    }

});

/**
 * --- CSS UTILE PER ANIMAZIONI (da mettere nello <style>) ---
 * 
 * .fade-in {
 *    animation: fadeIn 0.5s ease-in forwards;
 * }
 * 
 * @keyframes fadeIn {
 *    from { opacity: 0; transform: translateY(10px); }
 *    to { opacity: 1; transform: translateY(0); }
 * }
 * 
 * .spin {
 *    animation: rotate 1s linear infinite;
 * }
 * 
 * @keyframes rotate {
 *    from { transform: rotate(0deg); }
 *    to { transform: rotate(360deg); }
 * }
 */
