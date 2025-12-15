const DIM = 4;
$(document).ready(function () {
    let wrapper = $("#wrapper");
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            let div = $("<div></div>");
            div.attr("id", "btn" + i + j);
            div.addClass("btn"); // Optional: add a class for styling if needed, though id is used for logic
            div.click(sposta);
            wrapper.append(div);
        }

    }

    let ref;
    for (let i = 1; i < 16; i++) {
        let x, y;
        do {
            x = Math.floor(DIM * Math.random()); //0-3
            y = Math.floor(DIM * Math.random()); //0-3
            ref = $("#btn" + x + y);
        } while (ref.text() != "");
        ref.text(i);

    }
});

function sposta() {
    let btn = $(this);
    let id = btn.attr("id");
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

function swap(Pieno, Vuoto) {
    let tmp = Pieno.text();
    Pieno.text(Vuoto.text());
    Vuoto.text(tmp);
    //aggiungo un animazione per lo scambio carino che le faccia cambiare colore
    //Uso animate per farli passare dalla posizione di partenza alla posizione di arrivo
    Pieno.animate({
        left: Vuoto.position().left,
        top: Vuoto.position().top
    }, 1000);
    Vuoto.animate({
        left: Pieno.position().left,
        top: Pieno.position().top
    }, 1000);
}