/*LA MIA MAMA VUEL CHE FILA*/
const testoMamaVuelCheFila = [
    "La mia mama vuel che fila il lunes",
    "mi al lunes ciapu le pume un po' d'su si e un po' d'lu là la mia mama",
    "tra fe sina e fe disnè la mia mama vuel che fila mi pus pa filè",
    "",
    "La mia mama vuel che fila il martes",
    "mi al martes giocu le carte",
    "mi al lunes ciapu le pume un po' d'su si e un po' d'lu là la mia mama",
    "tra fe sina e fe disnè la mia mama vuel che fila mi pus pa filè",
    "",
    "La mia mama vuel che fila il mercu",
    "mi al mercu vadu da bertu",
    "mi al martes giocu le carte",
    "mi al lunes ciapu le pume un po' d'su si e un po' d'lu là la mia mama",
    "tra fe sina e fe disnè la mia mama vuel che fila mi pus pa filè",
    "",
    "La mia mama vuel che fila il giobbia",
    "mi al giobbia munt en s' la lobbia",
    "mi al mercu vadu da bertu",
    "mi al martes giocu le carte",
    "mi al lunes ciapu le pume un po' d'su si e un po' d'lu là la mia mama",
    "tra fe sina e fe disnè la mia mama vuel che fila mi pus pa filè",
    "",
    "La mia mama vuel che fila il vennar",
    "mi al vennar gavu la senne",
    "mi al giobbia munt en s' la lobbia",
    "mi al mercu vadu da bertu",
    "mi al martes giocu le carte",
    "mi al lunes ciapu le pume un po' d'su si e un po' d'lu là la mia mama",
    "tra fe sina e fe disnè la mia mama vuel che fila mi pus pa filè",
    "",
    "La mia mama vuel che fila il saba",
    "mi al saba ciapu la paga",
    "mi al vennar gavu la senne",
    "mi al giobbia munt en s' la lobbia",
    "mi al mercu vadu da bertu",
    "mi al martes giocu le carte",
    "mi al lunes ciapu le pume un po' d'su si e un po' d'lu là la mia mama",
    "tra fe sina e fe disnè la mia mama vuel che fila mi pus pa filè",
    "",
    "La mia mama vuel che fila il festa",
    "mi al festa catu la vesta",
    "mi al saba ciapu la paga",
    "mi al vennar gavu la senne",
    "mi al giobbia munt en s' la lobbia",
    "mi al mercu vadu da bertu",
    "mi al martes giocu le carte",
    "mi al lunes ciapu le pume un po' d'su si e un po' d'lu là la mia mama",
    "tra fe sina e fe disnè la mia mama vuel che fila mi pus pa filèèèèèèèèèè!"
];

function cantaLaMiaMamaVuelCheFila() {
    $("#lyrics-output").empty(); // Pulisce il testo precedente
    for (let i = 0; i < testoMamaVuelCheFila.length; i++) {
        const riga = testoMamaVuelCheFila[i];
        if (riga.trim() !== "") {
            $("#lyrics-output").append($("<h4>").text(riga));
        } else {
            $("#lyrics-output").append("<br>");
        }
    }
}

let testoMariemeVuiMarieme = [

];

function cantaMariemeVuiMarieme() {
    $("#lyrics-output").empty(); // Pulisce il testo precedente
    for (let i = 0; i < testoMariemeVuiMarieme.length; i++) {
        const riga = testoMariemeVuiMarieme[i];
        if (riga.trim() !== "") {
            $("#lyrics-output").append($("<h4>").text(riga));
        } else {
            $("#lyrics-output").append("<br>");
        }
    }
}
