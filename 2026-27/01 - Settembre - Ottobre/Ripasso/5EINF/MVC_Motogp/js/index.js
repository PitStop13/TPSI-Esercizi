"use strict";

// =============================================================================
// COSTANTE URL_BASE
// Punta all'endpoint del Front Controller (index.php) che gestisce le richieste.
// =============================================================================
const URL_BASE = "http://localhost/2026_27/5EINF/OLIVERO_spotify/index.php";

// =============================================================================
// EVENTO READY: viene eseguito quando il DOM della pagina Ã¨ completamente caricato.
// =============================================================================
$(document).ready(function () {

    // PASSO 1: All'avvio dell'applicazione carichiamo i dati iniziali dal server:
    // - I piloti per popolare la <select id="selPilota">
    // - I circuiti per popolare la <select id="selCircuito">
    // - Le gare attualmente presenti per renderizzarle nelle card
    caricaPiloti();
    caricaCircuiti();
    caricaGare();

    // =========================================================================
    // GESTIONE DELLA RICERCA E DEI FILTRI (LIVE SEARCH)
    // L'evento 'input' scatta ogni volta che l'utente digita o modifica il testo nei campi.
    // =========================================================================
    $("#inputFiltroStagione, #inputRicerca").on("input", function () {
        // Ricarichiamo le gare applicando i nuovi valori dei filtri in tempo reale
        caricaGare();
    });

    // =========================================================================
    // PULSANTE RESET DEI FILTRI
    // Ripristina i campi di ricerca ai valori vuoti e ricarica tutte le gare.
    // =========================================================================
    $("#btnReset").on("click", function () {
        $("#inputFiltroStagione").val("");
        $("#inputRicerca").val("");
        caricaGare();
    });

    // =========================================================================
    // INVIO DEL FORM NUOVA GARA (SUBMIT)
    // =========================================================================
    $("#formAggiungi").on("submit", function (e) {
        // PASSO 1: Bloccare il comportamento predefinito del browser.
        // Di default, l'evento submit ricaricherebbe l'intera pagina via HTTP POST;
        // e.preventDefault() evita il refresh per gestire tutto via AJAX.
        e.preventDefault();

        // PASSO 2: Leggere i valori inseriti dall'utente nei campi di input.
        let stagione = parseInt($("#inputStagione").val());
        let round = parseInt($("#inputRound").val());
        let dataOra = $("#inputDataOra").val();
        let circuitoId = parseInt($("#selCircuito").val());
        let pilotaId = parseInt($("#selPilota").val());

        // PASSO 3: Validazione client-side.
        // Se un campo Ã¨ mancante, notifichiamo l'utente e interrompiamo la funzione.
        if (!stagione || !round || !dataOra || !circuitoId || !pilotaId) {
            alert("Compila tutti i campi");
            return;
        }

        // PASSO 4: Inviare la richiesta AJAX POST con i dati in formato JSON.
        let request = inviaRichiesta("POST", URL_BASE + "?action=inserisci", {
            stagione: stagione,
            round: round,
            data_ora: dataOra,
            circuito_id: circuitoId,
            pilota_id: pilotaId
        });

        // In caso di errore lato server (es. 400 o 500), chiama la funzione errore()
        request.fail(errore);

        // In caso di successo (201 Created):
        request.done(function () {
            // Svuota i campi del form per un nuovo inserimento
            $("#formAggiungi")[0].reset();
            // Ricarica la lista delle gare per mostrare subito la nuova gara aggiunta
            caricaGare();
        });
    });

    // =========================================================================
    // FUNZIONE: caricaPiloti
    // Scarica via AJAX l'elenco dei piloti e popola il menu a tendina.
    // =========================================================================
    function caricaPiloti() {
        // PASSO 1: Eseguire la richiesta GET al backend (?action=getPiloti).
        let request = inviaRichiesta("GET", URL_BASE + "?action=getPiloti");
        request.fail(errore);

        // PASSO 2: All'arrivo dei dati (array di oggetti piloti).
        request.done(function (piloti) {
            let sel = $("#selPilota");
            // Svuota le opzioni precedenti per evitare duplicazioni
            sel.empty();

            // Aggiunge la prima opzione di placeholder
            $("<option>").val("").text("Pilota").appendTo(sel);

            // Cicla su ogni pilota e crea un tag <option value="ID">Nome (Team)</option>
            for (let p of piloti) {
                $("<option>").val(p.id).text(p.nome + " (" + p.team + ")").appendTo(sel);
            }
        });
    }

    // =========================================================================
    // FUNZIONE: caricaCircuiti
    // Scarica via AJAX l'elenco dei circuiti e popola il menu a tendina.
    // =========================================================================
    function caricaCircuiti() {
        // PASSO 1: Eseguire la richiesta GET (?action=getCircuiti).
        let request = inviaRichiesta("GET", URL_BASE + "?action=getCircuiti");
        request.fail(errore);

        // PASSO 2: Popolare la select dei circuiti.
        request.done(function (circuiti) {
            let sel = $("#selCircuito");
            sel.empty();

            $("<option>").val("").text("Circuito").appendTo(sel);

            // Cicla su ogni circuito e crea <option value="ID">Nome (Paese)</option>
            for (let c of circuiti) {
                $("<option>").val(c.id).text(c.nome + " (" + c.paese + ")").appendTo(sel);
            }
        });
    }

    // =========================================================================
    // FUNZIONE: caricaGare
    // Recupera le gare dal backend applicando i filtri di ricerca e disegna le card.
    // =========================================================================
    function caricaGare() {
        // PASSO 1: Leggere i valori attuali dei filtri (stagione e testo di ricerca).
        let stagione = $("#inputFiltroStagione").val().trim();
        let q = $("#inputRicerca").val().trim();

        // PASSO 2: Comporre l'URL con i parametri di query string codificati (encodeURIComponent).
        let url = URL_BASE + "?action=getAll&stagione=" + encodeURIComponent(stagione) + "&q=" + encodeURIComponent(q);

        // PASSO 3: Inviare la richiesta GET.
        let request = inviaRichiesta("GET", url);
        request.fail(errore);

        request.done(function (gare) {
            let lista = $("#tbodyGare");
            // Svuotiamo il contenitore delle card prima di inserire i nuovi elementi
            lista.empty();

            // Se l'array restituito dal server Ã¨ vuoto, mostriamo un messaggio informativo
            if (gare.length === 0) {
                $("<div>").addClass("empty-box").text("Nessuna gara trovata").appendTo(lista);
                return;
            }

            // PASSO 4: Ciclare su ciascuna gara e costruire dinamicamente la struttura HTML della card.
            for (let gara of gare) {
                // Se la posizione non Ã¨ ancora assegnata (null), mostriamo un trattino "-"
                let posizione = gara.posizione_arrivo === null ? "-" : gara.posizione_arrivo;

                // Badge colorato differente a seconda che la gara sia 'finale' o 'programmata'
                let badgeClass = gara.stato === "finale" ? "badge-finale" : "badge-programmata";

                // Creazione del contenitore principale della card (<article class="gara-card">)
                let card = $("<article>").addClass("gara-card");

                // Intestazione della card: Round, stagione e stato
                let head = $("<div>").addClass("gara-head").appendTo(card);
                $("<div>").addClass("gara-titolo").text("Round " + gara.round + " - " + gara.stagione).appendTo(head);
                $("<span>").addClass("badge-stato " + badgeClass).text(gara.stato).appendTo(head);

                // Corpo della card con tutte le informazioni: data formattata, circuito, pilota, team, posizione
                let body = $("<div>").addClass("gara-body").appendTo(card);
                $("<p>").html("<strong>Data:</strong> " + formatData(gara.data_ora)).appendTo(body);
                $("<p>").html("<strong>Circuito:</strong> " + gara.circuito + " (" + gara.paese + ")").appendTo(body);
                $("<p>").html("<strong>Pilota:</strong> " + gara.pilota).appendTo(body);
                $("<p>").html("<strong>Team:</strong> " + gara.team).appendTo(body);
                $("<p>").html("<strong>Posizione:</strong> " + posizione).appendTo(body);

                // Sezione azioni con i pulsanti 'Imposta posizione' ed 'Elimina'
                let azioni = $("<div>").addClass("gara-azioni").appendTo(card);

                // Pulsante 1: Imposta posizione (apre il prompt)
                $("<button>")
                    .addClass("btn-posizione")
                    .text("Imposta posizione")
                    .on("click", function () {
                        aggiornaPosizione(gara.id, gara.pilota);
                    })
                    .appendTo(azioni);

                // Pulsante 2: Elimina gara (con conferma)
                $("<button>")
                    .addClass("btn-elimina")
                    .text("Elimina")
                    .on("click", function () {
                        eliminaGara(gara.id);
                    })
                    .appendTo(azioni);

                // Aggiungiamo la card completa al contenitore della pagina
                lista.append(card);
            }
        });
    }

    // =========================================================================
    // FUNZIONE: aggiornaPosizione
    // Chiede la posizione all'utente con un prompt e invia una PATCH al server.
    // =========================================================================
    function aggiornaPosizione(id, pilota) {
        // PASSO 1: Mostrare una finestra di input (prompt) all'utente.
        let posizione = prompt("Posizione di arrivo per " + pilota + ":", "1");
        // Se l'utente clicca 'Annulla', il valore Ã¨ null e non facciamo nulla.
        if (posizione === null) return;

        // PASSO 2: Validare l'input convertendolo in intero.
        posizione = parseInt(posizione);
        if (Number.isNaN(posizione) || posizione <= 0) {
            alert("Inserisci una posizione valida (numero intero positivo)");
            return;
        }

        // PASSO 3: Inviare la richiesta PATCH inviando la posizione nel body JSON e l'ID nell'URL.
        let request = inviaRichiesta("PATCH", URL_BASE + "?action=aggiornaPosizione&id=" + id, {
            posizione_arrivo: posizione
        });

        request.fail(errore);
        // Al completamento, aggiorniamo la lista delle card per visualizzare la nuova posizione e lo stato 'finale'
        request.done(function () { caricaGare(); });
    }

    // =========================================================================
    // FUNZIONE: eliminaGara
    // Chiede conferma all'utente e invia una richiesta DELETE al backend.
    // =========================================================================
    function eliminaGara(id) {
        // PASSO 1: Chiedere conferma tramite confirm dialog. Se l'utente rifiuta, esce.
        if (!confirm("Eliminare questa gara?")) return;

        // PASSO 2: Inviare la richiesta DELETE con l'ID della gara nell'URL.
        let request = inviaRichiesta("DELETE", URL_BASE + "?action=elimina&id=" + id);
        request.fail(errore);

        // PASSO 3: Al successo, ricaricare le gare per rimuovere la card eliminata dallo schermo.
        request.done(function () { caricaGare(); });
    }

    // =========================================================================
    // FUNZIONE HELPER: formatData
    // Converte la stringa data/ora di MySQL (es. "2026-03-01 20:00:00")
    // nel formato italiano leggibile "GG/MM/AAAA HH:MM".
    // =========================================================================
    function formatData(dataOraSql) {
        let d = new Date(dataOraSql);
        if (Number.isNaN(d.getTime())) return dataOraSql;

        // padStart(2, "0") garantisce che i numeri a cifra singola abbiano lo zero davanti (es. '05')
        let gg = String(d.getDate()).padStart(2, "0");
        let mm = String(d.getMonth() + 1).padStart(2, "0"); // I mesi in JS vanno da 0 (Gennaio) a 11 (Dicembre)
        let aaaa = d.getFullYear();
        let hh = String(d.getHours()).padStart(2, "0");
        let min = String(d.getMinutes()).padStart(2, "0");

        return gg + "/" + mm + "/" + aaaa + " " + hh + ":" + min;
    }
});
