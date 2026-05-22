"use strict";

window.onload = function () {
    let _imgBox = document.getElementById("imgBox");

    // Porta Nuova - Torino (Nota: le coordinate puntano in realtà a Fossano)
    let Posizione = new google.maps.LatLng(44.5579227, 7.7266944);

    let opzioni = {
        center: Posizione,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        fullscreenControl: true,
        scaleControl: true
    };

    // Inizializzazione della mappa
    let mappa = new google.maps.Map(_imgBox, opzioni);

    // Aggiunta di un marcatore sulla mappa
    let marcatore1 = new google.maps.Marker({
        map: mappa,
        position: new google.maps.LatLng(44.5579227, 7.7266944),
        title: "Porta Nuova",
        animation: google.maps.Animation.BOUNCE,
        zIndex: 3,
        icon: "img/education/university.png"
    });

    // Configurazione della finestra informativa (InfoWindow)
    let info = `
        <div id='info'>
            <h2>ISS G. Vallauri</h2>
            <img src='img/vallauri.jpg' align='top'>
            <p>Indirizzo: via san Michele 68, Fossano (CN)</p>
            <p>Coordinate GPS: ${Posizione.lat()} - ${Posizione.lng()}</p>
        </div>
    `;

    let infoWindows = new google.maps.InfoWindow({
        content: info
    });

    // Evento click sul marcatore
    marcatore1.addListener("click", function () {
        infoWindows.open(mappa, marcatore1);
    });
};