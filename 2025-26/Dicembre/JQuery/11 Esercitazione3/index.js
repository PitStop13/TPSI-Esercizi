$(document).ready(function () {
    const DIM = 9;
    //seguo le istruzini del PDF
    //creo 9 quadratini con colori casuali
    //creo 3 textbox per inserire i colori (r,g,b)
    //creo un pulsante per verificare,se giusto il quadratino diventa trasparente
    //creo un div per mostrare il suggerimento
    //per gestire quale quadratino sto indovinando uso l'hover del mouse


    //crazione array con i colori:
    var colori = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "brown", "gray"];
    let wrapper = $("#quadrati").css({
        "display": "flex",
        "gap": "5px",
        "align-items": "center",
        "justify-content": "center"
    });

    for (let j = 0; j < DIM; j++) {
        let div = $("<div></div>");
        div.prop("id", "btn" + j);
        div.css({
            "background-color": colori[j],
            "width": "80px",
            "height": "80px",
            "flex-shrink": "0"
        });
        div.text(j + 1);
        wrapper.append(div);
    }


})