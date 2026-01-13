/**
 * LOGICA PER GIOCHI A GRIGLIA (Memory, Caccia al tesoro, etc.)
 */

$(document).ready(function () {

    const GRID_SIZE = 4; // 4x4
    let selectedCards = [];
    let matchesFound = 0;

    function initGame() {
        const $board = $("#game-board");
        $board.empty();

        // Crea array di coppie (es. 1,1,2,2,3,3...)
        let values = [];
        for (let i = 1; i <= (GRID_SIZE * GRID_SIZE / 2); i++) {
            values.push(i, i);
        }

        // Mischia
        values.sort(() => Math.random() - 0.5);

        // Genera Griglia
        values.forEach(val => {
            const $card = $("<div></div>")
                .addClass("card")
                .data("value", val) // Salva il valore nel data-attribute
                .text("?")
                .on("click", onCardClick);

            $board.append($card);
        });
    }

    function onCardClick() {
        const $clicked = $(this);

        // Evita click su carte già girate o se ne abbiamo già 2 selezionate
        if ($clicked.hasClass("flipped") || selectedCards.length >= 2) return;

        // "Gira" la carta
        $clicked.addClass("flipped").text($clicked.data("value"));
        selectedCards.push($clicked);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }

    function checkMatch() {
        const [c1, c2] = selectedCards;

        if (c1.data("value") === c2.data("value")) {
            // MATCH!
            c1.addClass("matched");
            c2.addClass("matched");
            matchesFound++;
            selectedCards = [];

            if (matchesFound === (GRID_SIZE * GRID_SIZE / 2)) {
                alert("Hai vinto!");
            }
        } else {
            // NO MATCH - rigira dopo un po'
            setTimeout(() => {
                c1.removeClass("flipped").text("?");
                c2.removeClass("flipped").text("?");
                selectedCards = [];
            }, 1000);
        }
    }

});

/**
 * --- CSS CONSIGLIATO ---
 * 
 * #game-board {
 *    display: grid;
 *    grid-template-columns: repeat(4, 1fr);
 *    gap: 10px;
 *    width: 400px;
 * }
 * 
 * .card {
 *    aspect-ratio: 1;
 *    background: #333;
 *    color: white;
 *    display: flex;
 *    align-items: center;
 *    justify-content: center;
 *    font-size: 2rem;
 *    cursor: pointer;
 *    border-radius: 8px;
 *    user-select: none;
 * }
 * 
 * .card.flipped { background: #6366f1; }
 * .card.matched { background: #10b981; cursor: default; }
 */
