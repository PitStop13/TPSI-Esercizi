const DIM = 4;
$(document).ready(function () {
    let wrapper = $("#wrapper");
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let div = $("<div></div>");
            div.prop("id", "btn" + i + j);
            div.prop("class", "btn");
            div.click(sposta);
            wrapper.append(div);
        }
    }

    let ref;
    for (let i = 1; i < 16; i++) {
        let x, y;
        do {
            x = Math.floor(DIM * Math.random()); //0-3
            y = Math.floor(DIM * Math.random());
            ref = $("#btn" + x + y);
            ref.css("background-color", "gray");
        } while (ref.text() != "");
        ref.text(i);

    }
});

function sposta() {
    let btn = $(this);
    if ($(".btn").is(":animated")) return;

    let id = btn.prop("id");
    let x = parseInt(id.substr(3, 1));
    let y = parseInt(id.substr(4, 1));

    if (y > 0 && $("#btn" + x + (y - 1)).text() == "") {
        swap(btn, $("#btn" + x + (y - 1)));
    } else if (y < DIM - 1 && $("#btn" + x + (y + 1)).text() == "") {
        swap(btn, $("#btn" + x + (y + 1)));
    } else if (x > 0 && $("#btn" + (x - 1) + y).text() == "") {
        swap(btn, $("#btn" + (x - 1) + y));
    } else if (x < DIM - 1 && $("#btn" + (x + 1) + y).text() == "") {
        swap(btn, $("#btn" + (x + 1) + y));
    }
}

function swap(Pieno, Vuoto) {
    let pPos = Pieno.position();
    let vPos = Vuoto.position();

    let pTop = vPos.top - pPos.top;
    let pLeft = vPos.left - pPos.left;

    Pieno.css("z-index", 100);
    Vuoto.css("z-index", 100);

    $.when(
        Pieno.animate({ top: pTop, left: pLeft }, 200),
        Vuoto.animate({ top: -pTop, left: -pLeft }, 200)
    ).done(function () {
        let tmp = Pieno.text();
        Pieno.text(Vuoto.text());
        Vuoto.text(tmp);

        Pieno.css({ "background-color": "white", "top": 0, "left": 0, "z-index": "" });
        Vuoto.css({ "background-color": "gray", "top": 0, "left": 0, "z-index": "" });

        checkVictory();
    });
}

function checkVictory() {
    let indice = 1;
    for (let righe = 0; righe < DIM; righe++) {
        for (let colonne = 0; colonne < DIM; colonne++) {
            let bottone = $("#btn" + righe + colonne);
            if (bottone.text() != indice) {
                if (indice == 16 && bottone.text() == "") {
                    alert("Hai vinto!");
                }
                return;
            }
            indice++;
        }
    }
}