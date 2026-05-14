"use strict";
let jsonDrivers, jsonRaces, jsonResults, jsonTeams;

window.onload = function () {
    creaGrafica();
}

async function creaGrafica() {
    await getData();
    console.log(jsonDrivers);
    console.log(jsonRaces);
    console.log(jsonResults);
    console.log(jsonTeams);
    loadSelectsRaces();
    loadSelectTeams();
}

async function getData() {
    let response;
    response = await fetch("php/getDrivers.php");
    jsonDrivers = await response.json();

    response = await fetch("php/getRaces.php");
    jsonRaces = await response.json();

    response = await fetch("php/getResults.php");
    jsonResults = await response.json();

    // fetch teams with nested drivers (endpoint creato)
    try {
        response = await fetch("php/getDataTableTeams.php");
        jsonTeams = await response.json();
    } catch (err) {
        console.error('Errore nel recupero dei teams:', err);
        jsonTeams = [];
    }
}

function loadSelectTeams() {
    let selectTeam = document.getElementById("selectTeam");
    // clear existing options
    selectTeam.innerHTML = "";
    // placeholder for all teams
    let placeholder = document.createElement('option');
    placeholder.value = "";
    placeholder.innerText = "-- Tutti i team --";
    selectTeam.appendChild(placeholder);

    for (let i = 0; i < jsonTeams.length; i++) {
        const team = jsonTeams[i] || {};
        const id = team.TeamID ?? team.teamId ?? team.TeamId ?? team.id ?? i;
        const name = team.Name ?? team.name ?? `Team ${id}`;
        let option = document.createElement("option");
        option.value = id;
        option.innerText = name;
        selectTeam.appendChild(option);
    }

    creaTabellaTeams();

    selectTeam.addEventListener("change", () => {
        creaTabellaTeams();
    });
}

function loadSelectsRaces() {
    let selectRace = document.getElementById("selectRace");
    for (let i = 0; i < jsonRaces.length; i++) {
        let option = document.createElement("option");
        option.value = jsonRaces[i].RaceID;
        option.innerText = jsonRaces[i].Name;
        selectRace.appendChild(option);
    }
    //Popolo la tabella al primo avvio o quando viene selezionata una gara diversa da quella di default
    // Ricarica la tabella quando l'utente cambia selezione
    creaTabellaRaces();

    selectRace.addEventListener("change", () => {
        creaTabellaRaces();
    });
}

async function creaTabellaTeams() {
    // Recupera il team selezionato e per prendere i piloti di un team devo guardare la tabella dei risultati e prendere i piloti che hanno quel teamID, poi con i piloti recuperati prendo i loro dati dalla tabella dei piloti
    let selectTeam = document.getElementById("selectTeam");
    let teamID = selectTeam.value;
    let response = await fetch("php/getDataTableTeams.php?idTeams=" + teamID);
    let jsonDataTableTeam = await response.json();
    alert("tabella teams con id " + teamID + " e " + jsonDataTableTeam.length + " piloti");
    
    
}
function creaTabellaRaces() {
    alert("creaTabellaRaces");
}