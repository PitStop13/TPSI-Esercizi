$(document).ready(function () {
    const DIM = 9;

    let quadrati = $("#quadrati").css({
        "display": "flex",
        "gap": "5px",
        "align-items": "center",
        "justify-content": "center"
    });

    for (let j = 0; j < DIM; j++) {
        let div = $("<div></div>");
        div.prop("id", "btn" + j);
        div.css({
            "background-color": "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")",
            "width": "80px",
            "height": "80px",
            "flex-shrink": "0"
        });
        div.text(j + 1);

        div.hover(function () {
            let rgb = $(this).css("background-color");
            suggerimento.text(rgb);

            suggerimento.finish().slideDown();

        }, function () {
            suggerimento.finish().slideUp();
        });
        quadrati.append(div);
    }


    //---------------->TextBox
    let h1 = $("<h1></h1>").text("Indovina la tonalità del colore").css({
        "text-align": "center",
        "margin-bottom": "30px"
    });
    $("#textbox").append(h1);

    var placeholder = ["Posizione", "Red", "Green", "Blue"];

    let textBox_Wrapper = $("#textbox").css({
        "display": "flex",
        "flex-direction": "column",
        "gap": "15px",
        "align-items": "center",
        "justify-content": "center",
        "margin-top": "30px"
    });

    for (let j = 0; j < 4; j++) {
        let row = $("<div></div>").css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "space-between",
            "width": "250px"
        });

        let label = $("<label></label>");
        label.text(placeholder[j]);
        label.css({
            "font-family": "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            "font-weight": "600",
            "color": "#333",
            "width": "100px"
        });

        let txtBox = $("<input type='text'></input>");
        txtBox.prop("id", placeholder[j]);
        txtBox.css({
            "border": "2px solid #ddd",
            "border-radius": "8px",
            "padding": "8px 12px",
            "width": "120px",
            "font-size": "14px",
            "transition": "border-color 0.3s, box-shadow 0.3s"
        });
        txtBox.prop("placeholder", placeholder[j]);

        row.append(label);
        row.append(txtBox);
        textBox_Wrapper.append(row);
    }

    let btnOk = $("<button></button>").text("OK").css({
        "background-color": "blue",
        "color": "white",
        "border": "none",
        "padding": "15px 50px",
        "cursor": "pointer",
        "border-radius": "8px"
    });
    btnOk.prop("id", "btnOk");
    btnOk.css({
        "margin-top": "20px"
    });
    textBox_Wrapper.append(btnOk);

    //---------------->Suggerimento
    let suggerimento = $("<div></div>").css({
        "display": "flex",
        "align-items": "center",
        "justify-content": "center",
        "color": "black",
        "padding": "10px",
    });
    $("#suggerimento").append(suggerimento);

    //Gestione logica e controlli
    btnOk.click(function () {
        let pos = $("#Posizione").val();
        let targetId = "#btn" + (pos - 1);
        if ($(targetId).css("opacity") === "0") {
            alert("Giaà indovinato");
            return;
        }

        let elemento = $(targetId);
        if (elemento.length === 0) return;

        let rgbVal = elemento.css("background-color");
        let parts = rgbVal.replace("rgb(", "").replace(")", "").split(",");

        let rSorgente = parts[0].trim();
        let gSorgente = parts[1].trim();
        let bSorgente = parts[2].trim();

        let rOk = ($("#Red").val() === rSorgente);
        let gOk = ($("#Green").val() === gSorgente);
        let bOk = ($("#Blue").val() === bSorgente);

        if (rOk && gOk && bOk) {
            elemento.css("opacity", "0");
            elemento.remove();
            elemento.off();
            alert("Indovinato!");
        } else {
            alert("Sbagliato! Riprova.");
        }
        if ($("#quadrati").children().length === 0) {
            alert("Hai vinto!");
        }
    });
})