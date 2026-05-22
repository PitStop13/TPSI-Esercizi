"use strict";


function visualizza() {
    let _input = document.getElementsByTagName("input");
    let partenza = _input[0].value;
    let arrivo = _input[1].value;
    let geocoder = new google.maps.Geocoder();


    geocoder.geocode({ "address": partenza }, function(results1, status1) {
        if (status1 == google.maps.GeocoderStatus.OK) {
            geocoder.geocode({ "address": arrivo }, function(results2, status2) {
                if (status2 == google.maps.GeocoderStatus.OK) {
                    let coordPartenza = results1[0].geometry.location;
                    let coordArrivo = results2[0].geometry.location;
                   
                    console.log(coordPartenza);
                    console.log(coordArrivo);
                   
                    VisualizzaPercorso(coordPartenza, coordArrivo);
                }
                else {
                    alert("Stringa ARRIVO non valida!");
                }
            });
        }
        else {
            alert("Stringa di PARTENZA non valida!");
        }
    });
}


function VisualizzaPercorso(partenza, arrivo) {
    let _imgBox = document.getElementById("imgBox");
   
    let opzioni = {
        center: partenza,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   
    let mappa = new google.maps.Map(_imgBox, opzioni);
   
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
   
    let percorso = {
        origin: partenza,
        destination: arrivo,
        travelMode: google.maps.TravelMode.DRIVING
    };
   
    directionsService.route(percorso, function(route, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setMap(mappa);
            directionsRenderer.setDirections(route);
            directionsRenderer.setPanel(document.getElementById("panel"));
            let distanza=route.routes[0].legs[0].distance.text;
            console.log("Distanza:"+distanza)
            let tempo=route.routes[0].legs[0].duration.text;
            console.log("tempo:"+tempo)
        }
        else {
            alert("Si è verificato un errore nel calcolo del percorso: " + status);
        }
    });
}



