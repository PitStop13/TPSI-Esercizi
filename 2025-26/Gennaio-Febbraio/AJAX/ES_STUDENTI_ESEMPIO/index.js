"use strict";

const URL_BASE = "http://localhost:3000";

// ============================================================
// VARIABILI GLOBALI PER I GRAFICI
// Le dichiaro fuori da tutto così posso aggiornarle
// da qualsiasi funzione con graficoClassi.update()
// ============================================================
let graficoClassi; // grafico a barre — studenti per classe
let graficoVoti;   // grafico a ciambella — distribuzione voti

// ============================================================
// AVVIO — quando la pagina è pronta
// ============================================================
$(document).ready(function () {

    // 1. Crea i due grafici VUOTI (senza dati)
    //    I dati arriveranno dopo la chiamata GET
    creaGrafici();

    // 2. Carica subito la lista dal server
    leggiStudenti();
});

// ============================================================
// creaGrafici() — Inizializza i canvas con Chart.js
// Chiamata UNA sola volta al caricamento della pagina.
// I dati vengono popolati da aggiornaGrafici()
// ============================================================
function creaGrafici() {

    // --- Grafico 1: Barre — Studenti per Classe ---
    let ctx1 = $("#canvasClassi");
    graficoClassi = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: [],   // classi (es. "3A", "3B", "5A") — popolate dopo
            datasets: [{
                label: "Numero studenti",
                data: [],  // conteggi — popolati dopo
                backgroundColor: [
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(153, 102, 255, 0.7)"
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 } // solo numeri interi sull'asse Y
                }
            }
        }
    });

    // --- Grafico 2: Doughnut — Distribuzione voti ---
    let ctx2 = $("#canvasVoti");
    graficoVoti = new Chart(ctx2, {
        type: "doughnut",
        data: {
            labels: [],  // fasce voto (es. "Voto 6", "Voto 7"...) — popolate dopo
            datasets: [{
                label: "Studenti",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                    "rgba(255, 205, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(201, 203, 207, 0.8)"
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });
}

// ============================================================
// aggiornaGrafici() — Rielabora i dati e aggiorna i grafici
// Va chiamata ogni volta che i dati cambiano
// (dopo GET, POST, PATCH, DELETE)
// ============================================================
function aggiornaGrafici(studenti) {

    // --- ELABORAZIONE DATI PER GRAFICO 1: studenti per classe ---
    // Uso un oggetto come "dizionario": { "3B": 2, "4A": 1, "5A": 1 }
    let contatoreClassi = {};
    for (let i = 0; i < studenti.length; i++) {
        let classe = studenti[i].classe;
        if (contatoreClassi[classe])
            contatoreClassi[classe]++;   // se esiste già, incrementa
        else
            contatoreClassi[classe] = 1; // se non esiste, crea con valore 1
    }
    // Aggiorna le labels e i dati del grafico barre
    graficoClassi.data.labels  = Object.keys(contatoreClassi);   // ["3B","4A","5A"]
    graficoClassi.data.datasets[0].data = Object.values(contatoreClassi); // [2,1,1]
    graficoClassi.update(); // FONDAMENTALE: ridisegna il grafico

    // --- ELABORAZIONE DATI PER GRAFICO 2: distribuzione voti ---
    let contatoreVoti = {};
    for (let i = 0; i < studenti.length; i++) {
        let voto = "Voto " + studenti[i].voto;
        if (contatoreVoti[voto])
            contatoreVoti[voto]++;
        else
            contatoreVoti[voto] = 1;
    }
    // Ordina le chiavi per voto crescente
    let votiOrdinati = Object.keys(contatoreVoti).sort();
    graficoVoti.data.labels = votiOrdinati;
    graficoVoti.data.datasets[0].data = votiOrdinati.map(v => contatoreVoti[v]);
    graficoVoti.update(); // ridisegna
}

// ============================================================
// GET — Legge tutti gli studenti, popola tabella E grafici
// ============================================================
function leggiStudenti() {
    let request = inviaRichiesta("GET", URL_BASE + "/studenti");
    request.fail(errore);
    request.done(function (studenti) {
        // 1. Svuota e ripopola la tabella
        $("#tbodyStudenti").html("");
        for (let i = 0; i < studenti.length; i++) {
            let s = studenti[i];
            let tr = $("<tr>").appendTo("#tbodyStudenti");
            $("<td>").text(s.id).appendTo(tr);
            $("<td>").text(s.nome).appendTo(tr);
            $("<td>").text(s.cognome).appendTo(tr);
            $("<td>").text(s.classe).appendTo(tr);
            $("<td>").text(s.voto).appendTo(tr);

            let tdAz = $("<td>").appendTo(tr);
            $("<button>").addClass("btn btn-warning btn-sm me-1").text("✏️ Modifica")
                .data("id", s.id).on("click", mostraFormModifica).appendTo(tdAz);
            $("<button>").addClass("btn btn-danger btn-sm").text("🗑️ Elimina")
                .data("id", s.id).on("click", eliminaStudente).appendTo(tdAz);
        }
        // 2. Aggiorna i grafici con gli stessi dati
        aggiornaGrafici(studenti);
    });
}

// ============================================================
// POST — Inserisce un nuovo studente
// ============================================================
function inserisciStudente() {
    let nome    = $("#txtNome").val().trim();
    let cognome = $("#txtCognome").val().trim();
    let classe  = $("#txtClasse").val().trim();
    let voto    = parseInt($("#txtVoto").val());

    // Valida PRIMA di inviare
    if (nome === "" || cognome === "" || classe === "") {
        mostraAlert("danger", "⚠️ Compila tutti i campi!"); return;
    }
    if (isNaN(voto) || voto < 1 || voto > 10) {
        mostraAlert("danger", "⚠️ Voto non valido (1-10)!"); return;
    }

    // NON inserire l'id: json-server lo genera automaticamente
    let nuovoStudente = { nome: nome, cognome: cognome, classe: classe, voto: voto };

    let request = inviaRichiesta("POST", URL_BASE + "/studenti", nuovoStudente);
    request.fail(errore);
    request.done(function (creato) {
        mostraAlert("success", "✅ Studente inserito con id: " + creato.id);
        svuotaForm();
        leggiStudenti(); // ricarica tabella E grafici
    });
}

// ============================================================
// GET singolo — Pre-compila il form per la modifica
// ============================================================
function mostraFormModifica() {
    let id = $(this).data("id"); // recupera l'id salvato sul pulsante
    let request = inviaRichiesta("GET", URL_BASE + "/studenti/" + id);
    request.fail(errore);
    request.done(function (s) {
        // Riempie il form con i dati attuali dello studente
        $("#txtId").val(s.id);
        $("#txtNome").val(s.nome);
        $("#txtCognome").val(s.cognome);
        $("#txtClasse").val(s.classe);
        $("#txtVoto").val(s.voto);

        $("#titoloForm").text("✏️ Modifica studente (id: " + s.id + ")");
        $("#btnInserisci").addClass("d-none");
        $("#btnAggiorna, #btnAnnulla").removeClass("d-none");
        $("html, body").animate({ scrollTop: 0 }, 300); // scorre in cima
    });
}

// ============================================================
// PATCH — Aggiorna solo i campi modificati
// ============================================================
function aggiornaStudente() {
    let id      = $("#txtId").val();
    let nome    = $("#txtNome").val().trim();
    let cognome = $("#txtCognome").val().trim();
    let classe  = $("#txtClasse").val().trim();
    let voto    = parseInt($("#txtVoto").val());

    if (nome === "" || cognome === "" || classe === "") {
        mostraAlert("danger", "⚠️ Compila tutti i campi!"); return;
    }
    if (isNaN(voto) || voto < 1 || voto > 10) {
        mostraAlert("danger", "⚠️ Voto non valido (1-10)!"); return;
    }

    // PATCH: manda solo i campi → l'id rimane nell'URL, non nel body
    let dati = { nome: nome, cognome: cognome, classe: classe, voto: voto };
    let request = inviaRichiesta("PATCH", URL_BASE + "/studenti/" + id, dati);
    request.fail(errore);
    request.done(function () {
        mostraAlert("success", "✅ Studente aggiornato!");
        annullaModifica();
        leggiStudenti(); // ricarica tabella E grafici
    });
}

// ============================================================
// DELETE — Elimina uno studente
// ============================================================
function eliminaStudente() {
    let id = $(this).data("id");
    if (!confirm("Eliminare lo studente con id " + id + "?")) return;

    let request = inviaRichiesta("DELETE", URL_BASE + "/studenti/" + id);
    request.fail(errore);
    request.done(function () {
        mostraAlert("success", "🗑️ Studente eliminato!");
        leggiStudenti(); // ricarica tabella E grafici
    });
}

// ============================================================
// FUNZIONI DI SUPPORTO
// ============================================================

// Ripristina il form in modalità "inserimento"
function annullaModifica() {
    svuotaForm();
    $("#titoloForm").text("➕ Inserisci nuovo studente");
    $("#btnInserisci").removeClass("d-none");
    $("#btnAggiorna, #btnAnnulla").addClass("d-none");
}

// Svuota tutti i campi del form
function svuotaForm() {
    $("#txtId, #txtNome, #txtCognome, #txtClasse, #txtVoto").val("");
}

// Mostra un messaggio all'utente tramite Alert di Bootstrap
// tipo: "success" (verde) | "danger" (rosso) | "warning" (giallo)
function mostraAlert(tipo, messaggio) {
    let div = $("#divAlert");
    div.removeClass("alert-success alert-danger alert-warning alert-info");
    div.addClass("alert-" + tipo).text(messaggio).removeClass("d-none");
    // Si nasconde automaticamente dopo 4 secondi
    setTimeout(function () { div.addClass("d-none"); }, 4000);
}
