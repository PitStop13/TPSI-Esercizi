"use strict"
let chartOptions = {
    type : "polarArea", //doughnut = ciambella, radar = radar, bar = barre, ...per altro cerco su charjs per altri o documentazione
    data : {
        labels : ["pippo","pluto","minnie"],
        datasets : [{
            label : "Risultati 2025-26", //titolo del grafico
            data:[12,9,37], //valori da assegnare per ogni singola barra
            backgroundColor : ["red","blu","green"],
            borderColor : ["black","yellow","red"],
            borderWidth : 1 //di default è due poi io posso scegliere se aumentare o cosa fare

        }]
    } 
};

$(document).ready(function(){
    let canvas = $("#canvas");
    console.log("ciao")
    //per creare i grafici ho bisogno della classe chart
    let chart = new Chart(canvas,chartOptions);

});