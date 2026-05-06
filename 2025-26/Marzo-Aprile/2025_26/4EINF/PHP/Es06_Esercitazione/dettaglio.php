<?php
// ============================================================
// FILE: dettaglio.php
// PROGETTO: StreamingTV - Esercitazione TPSIT 4EINF
// ============================================================
// COME FUNZIONA:
//   Viene chiamata da index.php con un parametro nell'URL:
//     dettaglio.php?id=5
//   $_GET["id"] contiene l'id dell'utente da mostrare.
//
//   1. Legge l'id dall'URL
//   2. Si connette al DB
//   3. Fa una query JOIN per prendere i dati dell'utente
//      e del suo abbonamento in una volta sola
//   4. Mostra la pagina con due sezioni:
//      - Dati anagrafici dell'utente
//      - Caratteristiche del piano abbonamento
// ============================================================

// ── STEP 1: Controllo sicurezza ──────────────────────────────
// Se qualcuno apre dettaglio.php senza passare l'id nell'URL,
// lo rimando alla home invece di dare errori
if (!isset($_GET["id"])) {
    header("Location: index.php");   // Reindirizzamento HTTP
    exit;                            // Fermo lo script qui
}

// ── STEP 2: Prendo l'id e lo converto in intero ──────────────
// intval() converte la stringa in numero intero.
// Esempio: intval("5") = 5, intval("5; DROP TABLE") = 5
// Protegge da SQL Injection di base!
$id_utente = intval($_GET["id"]);

// ── STEP 3: Connessione al Database ──────────────────────────
$con = mysqli_connect("localhost", "root", "", "4e_streaming_tv");

if ($con->connect_errno) {
    die("Connessione fallita: " . $con->connect_errno . " - " . $con->connect_error);
}

// ── STEP 4: Query con JOIN ────────────────────────────────────
// Vogliamo i dati dell'utente (tabella utenti) + i dati
// del suo piano (tabella abbonamenti) → JOIN!
// Elenchiamo esplicitamente le colonne per evitare conflitti
// (entrambe le tabelle hanno una colonna "id")
$sql = "SELECT
            u.*,u.id AS id_utente,
            a.*
        FROM utenti AS u
        JOIN abbonamenti AS a ON u.id_abbonamento = a.id
        WHERE u.id = $id_utente";

// ── STEP 5: Esecuzione query e controllo ──────────────────────
$rs = $con->query($sql);

if (!$rs) {
    $con->close();
    die("Query fallita: " . $con->errno . " - " . $con->error);
}

// ── STEP 6: Leggo il singolo risultato ───────────────────────
// Non uso il while perché mi aspetto UNA sola riga (1 utente)
$row = $rs->fetch_assoc();

// Se l'utente non esiste (id non trovato), torno alla home
if (!$row) {
    $con->close();
    header("Location: index.php");
    exit;
}
// Da qui in poi uso $row["nome"], $row["email"], ecc.
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap.css">
    <title>StreamingTV – Dettaglio utente</title>
    <style>
        /* Larghezza fissa per la colonna delle etichette nelle tabelle */
        .label-col {
            font-weight: bold;
            width: 50%;
        }
    </style>
</head>
<body>

<!-- ===== NAVBAR ===== -->
<nav class="navbar navbar-dark bg-dark">
    <div class="container">
        <span class="navbar-brand fw-bold">📺 StreamingTV</span>
        <!--
            Pulsante in alto a destra per tornare alla lista.
            Usa un form POST perché la lista si attiva solo in POST.
        -->
        <!-- <form action="index.php" method="POST" style="margin:0;">
            <input type="hidden" name="abbonati" value="1">
            <button type="submit" class="btn btn-outline-light btn-sm">← Elenco abbonati</button>
        </form> -->
    </div>
</nav>

<div class="container mt-4">

    <!-- =====================================================
         SEZIONE 1: DATI ANAGRAFICI
         ===================================================== -->
    <div class="card mb-4">

        <div class="card-header bg-dark text-white">
            <strong>Dati anagrafici</strong>
        </div>

        <div class="card-body">
            <div class="row">

                <!-- Colonna sinistra -->
                <div class="col-6">
                    <p>
                        <strong>Nome e cognome:</strong>
                       <?= $row["nome"] . " " . $row["cognome"] ?> 
                    </p>
                    <p>
                        <strong>Email:</strong>
                        <?= $row["email"] ?>
                    </p>
                    <p>
                        <strong>Telefono:</strong>
                        <?= $row["telefono"] ?>
                    </p>
                    <p>
                        <strong>Data di nascita:</strong>
                        <?= $row["data_nascita"] ?>
                    </p>
                </div>

                <!-- Colonna destra -->
                <div class="col-6">
                    <p>
                        <strong>Indirizzo:</strong>
                        <?= $row["indirizzo"] ?>
                    </p>
                    <p>
                        <strong>Città:</strong>
                        <?= $row["citta"] . " (" . $row["provincia"] . ")"  . " - " . $row["cap"] ?>
                    </p>
                    <p>
                        <strong>Iscritto dal:</strong>
                        <?= $row["data_iscrizione"] ?>
                    </p>
                    <p>
                        <strong>Scadenza abbonamento:</strong>
                        <?= $row["scadenza_abbonamento"] ?>
                    </p>
                    <p>
                        <strong>Stato account:</strong>
                        <?php
                        // $row["attivo"] = 1 (attivo) oppure 0 (inattivo)
                        // Mostro un badge colorato diverso per i due casi
                        if ($row["attivo"] == 1) {
                            echo '<span class="badge bg-success">Attivo</span>';
                        } else {
                            echo '<span class="badge bg-danger">Inattivo</span>';
                        }
                        ?>
                    </p>
                    
                </div>

            </div>
        </div>

    </div>

    <!-- =====================================================
         SEZIONE 2: PIANO ABBONAMENTO
         ===================================================== -->
    <?php
    // Scelgo l'icona in base al tipo di piano
    // ucfirst() mette in maiuscolo la prima lettera: "premium" → "Premium"
    if ($row["tipo"] == "premium") {
        $icona = "⭐";
    } elseif ($row["tipo"] == "standard") {
        $icona = "🥈";
    } else {
        $icona = "⚫";
    }
    ?>

    <div class="card mb-4">

        <div class="card-header bg-secondary text-white">
            <strong><?= $icona . " Piano " . ucfirst($row["tipo"]) ?></strong>
            <br>
            <small><?= $row["descrizione"] ?></small>
        </div>

        <div class="card-body">
            <div class="row">

                <!-- Colonna sinistra: caratteristiche numeriche -->
                <div class="col-6">
                    <table class="table table-sm table-bordered">
                        <tr>
                            <td class="label-col">Costo mensile</td>
                            <!-- number_format(valore, decimali): formatta il numero con 2 decimali -->
                            <td><?= $row["costo_mensile"] ?> €</td>
                        </tr>
                        <tr>
                            <td class="label-col">Dispositivi registrabili</td>
                            <td><?= $row["numero_dispositivi"] ?></td>
                        </tr>
                        <tr>
                            <td class="label-col">Stream simultanei</td>
                            <td><?= $row["schermi_simultanei"] ?></td>
                        </tr>
                        <tr>
                            <td class="label-col">Risoluzione massima</td>
                            <td><?= $row["risoluzione_massima"] ?></td>
                        </tr>
                    </table>
                </div>

                <!-- Colonna destra: caratteristiche booleane (Sì/No) -->
                <div class="col-6">
                    <table class="table table-sm table-bordered">
                        <tr>
                            <td class="label-col">Qualità video</td>
                            <td><?= $row["qualita_video"] ?></td>
                        </tr>
                        <tr>
                            <td class="label-col">Qualità audio</td>
                            <td><?= $row["qualita_audio"] ?></td>
                        </tr>
                        <tr>
                            <td class="label-col">Download offline</td>
                            <!-- Operatore ternario: condizione ? se_vero : se_falso -->
                            <td><?= $row["download_offline"] ? "✅ Sì" : "❌ No" ?></td>
                        </tr>
                        <tr>
                            <td class="label-col">Contenuti esclusivi</td>
                            <td><?= $row["contenuti_esclusivi"] ? "✅ Sì" : "❌ No" ?></td>
                        </tr>
                        <tr>
                            <td class="label-col">Pubblicità</td>
                            <td><?= $row["pubblicita"] ? "❌ Presente" : "✅ Assente" ?></td>
                        </tr>
                        <tr>
                            <td class="label-col">Giorni di prova gratuita</td>
                            <td><?= $row["periodo_prova_giorni"] ?> giorni</td>
                        </tr>
                        <tr>
                            <td class="label-col">Supporto prioritario</td>
                            <td><?= $row["supporto_prioritario"] ? "✅ Sì" : "❌ No" ?></td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>

    </div>

    <!-- =====================================================
         PULSANTE "TORNA ALL'ELENCO ABBONATI"
         =====================================================
         NON possiamo usare un semplice link (GET) perché la
         lista abbonati si attiva solo in modalità POST.
         Usiamo un form con un input hidden che simula il
         click sul pulsante "Mostra abbonati" di index.php.
    -->
    <div class="mb-5">
        <form action="index.php" method="POST">
            <input type="hidden" name="abbonati" value="1">
            <button type="submit" class="btn btn-secondary">
                ← Torna all'elenco abbonati
            </button>
        </form>
    </div>

</div>

<?php
// ── STEP 7: Chiudo la connessione ──────────────────────────
$con->close();
?>

</body>
</html>
