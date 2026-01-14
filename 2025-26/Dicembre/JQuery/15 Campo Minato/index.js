const ROWS = 10;
const COLS = 10;
const BOMBS = 15;

let grid = []; // Matrice per memorizzare i dati (bombe, numeri)
let gameOver = false;
let revealedCount = 0;
let seconds = 0;
let timerInterval = null;

$(document).ready(function () {
    initGame();

    $("#reset-btn").on("click", function () {
        initGame();
    });
});

function initGame() {
    clearInterval(timerInterval);
    gameOver = false;
    revealedCount = 0;
    seconds = 0;
    grid = [];

    $("#timer").text(0);
    $("#bomb-count").text(BOMBS);
    $("#grid-wrapper").empty();

    // Configura la griglia CSS
    $("#grid-wrapper").css({
        "grid-template-columns": `repeat(${COLS}, 30px)`,
        "grid-template-rows": `repeat(${ROWS}, 30px)`
    });

    creaTabella();
    piazzaBombe();
    calcolaVicini();
}

function creaTabella() {
    for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
            grid[r][c] = {
                bomb: false,
                count: 0,
                revealed: false,
                flagged: false
            };

            const $cell = $("<div>")
                .addClass("cell")
                .attr("id", `cell-${r}-${c}`)
                .on("click", function () { gestisciClickSinistro(r, c); })
                .on("contextmenu", function (e) {
                    e.preventDefault(); // Impedisce il menu tasto destro
                    gestisciClickDestro(r, c);
                });

            $("#grid-wrapper").append($cell);
        }
    }
}

function piazzaBombe() {
    let bombePiazzate = 0;
    while (bombePiazzate < BOMBS) {
        let r = Math.floor(Math.random() * ROWS);
        let c = Math.floor(Math.random() * COLS);

        if (!grid[r][c].bomb) {
            grid[r][c].bomb = true;
            bombePiazzate++;
        }
    }
}

function calcolaVicini() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (grid[r][c].bomb) continue;

            let count = 0;
            // Controlla le 8 celle circostanti
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    let nr = r + dr;
                    let nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        if (grid[nr][nc].bomb) count++;
                    }
                }
            }
            grid[r][c].count = count;
        }
    }
}

function gestisciClickSinistro(r, c) {
    if (gameOver || grid[r][c].revealed || grid[r][c].flagged) return;

    // Avvia il timer al primo click
    if (revealedCount === 0 && !timerInterval) {
        startTimer();
    }

    scopriCella(r, c);
}

function gestisciClickDestro(r, c) {
    if (gameOver || grid[r][c].revealed) return;

    const $cell = $(`#cell-${r}-${c}`);
    grid[r][c].flagged = !grid[r][c].flagged;
    $cell.toggleClass("flagged");
}

function scopriCella(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c].revealed) return;

    const $cell = $(`#cell-${r}-${c}`);
    grid[r][c].revealed = true;
    $cell.addClass("revealed");

    if (grid[r][c].bomb) {
        terminaGioco(false);
        return;
    }

    revealedCount++;

    if (grid[r][c].count > 0) {
        $cell.text(grid[r][c].count).addClass(`n-${grid[r][c].count}`);
    } else {
        // Se la cella è vuota (0 bombe vicine), scopri le adiacenti ricorsivamente
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                scopriCella(r + dr, c + dc);
            }
        }
    }

    if (revealedCount === (ROWS * COLS) - BOMBS) {
        terminaGioco(true);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        $("#timer").text(seconds);
    }, 1000);
}

function terminaGioco(vittoria) {
    gameOver = true;
    clearInterval(timerInterval);

    if (vittoria) {
        alert("Complimenti, hai vinto!");
    } else {
        // Mostra tutte le bombe
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c].bomb) {
                    $(`#cell-${r}-${c}`).addClass("bomb revealed");
                }
            }
        }
        alert("BOOM! Hai colpito una mina.");
    }
}
