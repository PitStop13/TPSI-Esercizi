const righe = 6;
const colonne = 7;
$(document).ready(function () {
    $("<h1>").text("Forza 4").appendTo("body");
    $("<div>").attr("id", "header").appendTo("body");
    $("<div>").attr("id", "wrapper").appendTo("body");

    let header = $("#header");
    let wrapper = $("#wrapper");

    creaTabellaDinamica(righe, colonne);

    for (let i = 0; i < colonne; i++) {
        let pedina = $("<div>").addClass("pedina").prop("id", "pedina-" + i);
        header.append(pedina);
    }

    function creaTabellaDinamica(righe, colonne) {
        const $wrapper = $("#wrapper");
        $wrapper.empty();
        for (let i = 0; i < righe; i++) {
            for (let j = 0; j < colonne; j++) {
                const $pedina = $("<div>")
                    .addClass("pedina")
                    .attr("id", "pedina-" + i + "-" + j);
                $wrapper.append($pedina);
            }
        }
    }

    let turno = true;
    header.children("div").on("mouseover", mouseOver);
    function mouseOver() {
        if (turno) {
            $(this).addClass("rosso");
            $(this).removeClass("giallo");

        }
        else {
            $(this).addClass("giallo");
            $(this).removeClass("rosso");
        }

    }
    header.children("div").on("mouseout", mouseOut);
    function mouseOut() {
        $(this).removeClass("rosso");
        $(this).removeClass("giallo");
    }

    header.children("div").on("click", mouseClick);

    function mouseClick() {
        if (turno) {
            $(this).addClass("rosso");
            let colPrimaRiga = parseInt($(this).prop("id").split("-")[1]);
            console.log(colPrimaRiga);

            let cont = 0;
            let interval = setInterval(() => {

                let colPedina = $("#pedina-" + cont + "-" + colPrimaRiga).prop("id");
                $("#" + colPedina).addClass("rosso");

                if (cont > 0) {
                    let pedinaPrecedente = $("#pedina-" + (cont - 1) + "-" + colPrimaRiga).prop("id");
                    $("#" + pedinaPrecedente).removeClass("rosso");
                }

                let cellaSotto = $("#pedina-" + (cont + 1) + "-" + colPrimaRiga);
                let occupataSotto = cellaSotto.hasClass("giallo") || cellaSotto.hasClass("rosso");

                if (cont == righe - 1 || occupataSotto) {
                    clearInterval(interval);
                    if (controllaVittoria(cont, colPrimaRiga, "rosso")) {
                        alert("Vittoria Rosso!");
                    }
                }
                else {
                    cont++;
                }
            }, 200);
        }
        else {
            $(this).addClass("giallo");
            let colPrimaRiga = parseInt($(this).prop("id").split("-")[1]);
            console.log(colPrimaRiga);

            let cont = 0;
            let interval = setInterval(() => {

                let colPedina = $("#pedina-" + cont + "-" + colPrimaRiga).prop("id");
                $("#" + colPedina).addClass("giallo");

                if (cont > 0) {
                    let pedinaPrecedente = $("#pedina-" + (cont - 1) + "-" + colPrimaRiga).prop("id");
                    $("#" + pedinaPrecedente).removeClass("giallo");
                }

                let cellaSotto = $("#pedina-" + (cont + 1) + "-" + colPrimaRiga);
                let occupataSotto = cellaSotto.hasClass("giallo") || cellaSotto.hasClass("rosso");

                if (cont == righe - 1 || occupataSotto) {
                    clearInterval(interval);
                    if (controllaVittoria(cont, colPrimaRiga, "giallo")) {
                        alert("Vittoria Giallo!");

                    }
                }
                else {
                    cont++;
                }
            }, 100);
        }
        turno = !turno;
    }

});



// function controllaVittoria(rigaCorrente, colCorrente, colore) {
//     // Direzioni: [deltaRiga, deltaColonna]
//     const direzioni = [
//         [[0, 1], [0, -1]],  // Orizzontale
//         [[1, 0], [-1, 0]],  // Verticale
//         [[1, 1], [-1, -1]], // Diagonale \
//         [[1, -1], [-1, 1]]  // Diagonale /
//     ];

//     for (let d = 0; d < direzioni.length; d++) {
//         let cont = 1;
//         for (let i = 0; i < 2; i++) { // Controlla entrambi i versi della direzione
//             let deltaR = direzioni[d][i][0];
//             let deltaC = direzioni[d][i][1];
//             let r = rigaCorrente + deltaR;
//             let c = colCorrente + deltaC;

//             while (r >= 0 && r < righe && c >= 0 && c < colonne && $("#pedina-" + r + "-" + c).hasClass(colore)) {
//                 cont++;
//                 r += deltaR;
//                 c += deltaC;
//             }
//         }
//         if (cont >= 4) return true;
//     }
//     return false;
// }

function controllaVittoria(r, c, colore) {
    let cont;

    // 1. CONTROLLO VERTICALE (Solo verso il basso)
    cont = 1;
    for (let i = 1; i < 4; i++) {
        if ($("#pedina-" + (r + i) + "-" + c).hasClass(colore)) {
            cont++;
        } else {
            break; // Se trova un colore diverso o una cella vuota, si ferma
        }
    }
    if (cont >= 4) return true;

    // 2. CONTROLLO ORIZZONTALE (Destra + Sinistra)
    cont = 1;
    // Guarda a destra
    for (let i = 1; i < 4; i++) {
        if ($("#pedina-" + r + "-" + (c + i)).hasClass(colore)) cont++;
        else break;
    }
    // Guarda a sinistra
    for (let i = 1; i < 4; i++) {
        if ($("#pedina-" + r + "-" + (c - i)).hasClass(colore)) cont++;
        else break;
    }
    if (cont >= 4) return true;

    // 3. DIAGONALE PRINCIPALE \ (Alto/Sx + Basso/Dx)
    cont = 1;
    for (let i = 1; i < 4; i++) {
        if ($("#pedina-" + (r + i) + "-" + (c + i)).hasClass(colore)) cont++;
        else break;
    }
    for (let i = 1; i < 4; i++) {
        if ($("#pedina-" + (r - i) + "-" + (c - i)).hasClass(colore)) cont++;
        else break;
    }
    if (cont >= 4) return true;

    // 4. DIAGONALE SECONDARIA / (Basso/Sx + Alto/Dx)
    cont = 1;
    for (let i = 1; i < 4; i++) {
        if ($("#pedina-" + (r + i) + "-" + (c - i)).hasClass(colore)) cont++;
        else break;
    }
    for (let i = 1; i < 4; i++) {
        if ($("#pedina-" + (r - i) + "-" + (c + i)).hasClass(colore)) cont++;
        else break;
    }
    if (cont >= 4) return true;

    return false; // Se non ha trovato 4 pedine in nessuna direzione
}