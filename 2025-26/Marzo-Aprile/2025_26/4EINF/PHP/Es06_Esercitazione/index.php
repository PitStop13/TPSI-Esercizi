<?php
// ============================================================
// FILE: index.php
// PROGETTO: StreamingTV - Esercitazione TPSIT 4EINF
// ============================================================
// COME FUNZIONA QUESTA PAGINA:
//   La pagina si comporta in modo diverso a seconda di come
//   viene caricata:
//
//   MODALITÀ 1 (GET, caricamento normale):
//     → Mostra la home page con il pulsante "Mostra abbonati"
//
//   MODALITÀ 2 (POST, dopo aver cliccato il pulsante):
//     → Connette al DB, legge tutti gli utenti, li divide
//       nei 3 piani (premium/standard/base) e mostra le card
// ============================================================
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap.css">

    <title>StreamingTV</title>
    <style>
        /* Stile per le card degli abbonati */
        .card-utente {
            border: 1px solid #dee2e6;
            border-radius: 6px;
            padding: 10px 12px;
            margin-bottom: 10px;
            background-color: #f8f9fa;
            transition: background-color 0.2s;
        }
        /* Effetto hover: la card si scurisce al passaggio del mouse */
        .card-utente:hover {
            background-color: #e2e6ea;
            cursor: pointer;
        }
        /* Rimuove la sottolineatura dai link delle card */
        .link-card {
            text-decoration: none;
            color: inherit;
        }
    </style>
</head>
<body>

<!-- ===== BARRA DI NAVIGAZIONE IN ALTO ===== -->
<nav class="navbar navbar-dark bg-dark">
    <div class="container">
        <span class="navbar-brand fw-bold">📺 StreamingTV</span>
    </div>
</nav>

<?php
// ============================================================
// CONTROLLO: siamo in GET o in POST?
//
// isset($_POST["abbonati"]) → TRUE solo se il form è stato
// inviato con il button che ha name="abbonati".
// Se è FALSE siamo in GET → mostriamo la home.
// ============================================================
if (!isset($_POST["abbonati"])) {

    // ----------------------------------------------------------
    // *** MODALITÀ 1: HOME PAGE ***
    // ----------------------------------------------------------
    echo '
    <div class="container text-center mt-5">

        <h1 class="display-4 fw-bold">Benvenuto su StreamingTV 📺</h1>
        <p class="lead text-muted">Gestisci e visualizza tutti gli abbonati alla piattaforma.</p>
        <hr>
        <p>
            Sono disponibili tre piani: <strong>Premium</strong>, <strong>Standard</strong> e <strong>Base</strong>,
            ognuno con le sue caratteristiche diverse.
        </p>
        <p>Clicca il pulsante qui sotto per vedere l\'elenco completo degli abbonati.</p>

        <!--
            FORM: action="" = invia alla stessa pagina (index.php)
                  method="POST" = i dati non appaiono nell\'URL
            Quando si clicca il button, $_POST["abbonati"] esiste
            → PHP entra nel blocco else sotto
        -->
        <form action="" method="POST">
            <button type="submit" name="abbonati" value="1" class="btn btn-dark btn-lg mt-2">
                📋 Mostra abbonati
            </button>
        </form>

        <hr class="mt-5">
        <small class="text-muted">
            ' . date("d/m/Y") . ' – Classe 4E INFORMATICA
        </small>
    </div>';

} else {

    // ----------------------------------------------------------
    // *** MODALITÀ 2: ELENCO ABBONATI ***
    // ----------------------------------------------------------

    // ── STEP 1: Connessione al Database ─────────────────────
    // mysqli_connect(host, utente, password, nome_database)
    $con = mysqli_connect("localhost", "root", "", "4e_streaming_tv");

    // ── STEP 2: Controllo connessione ───────────────────────
    if ($con->connect_errno) {
        die("Connessione fallita: " . $con->connect_errno . " - " . $con->connect_error);
    }

    // ── STEP 3: Query SQL con JOIN ───────────────────────────
    // JOIN unisce utenti + abbonamenti tramite id_abbonamento
    // Prendiamo il campo "tipo" (base/standard/premium) dall'abbonamento
    // ORDER BY: prima per tipo piano, poi per cognome (alfabetico)
    $sql = "SELECT u.id, u.nome, u.cognome, u.email, u.citta, a.tipo
            FROM utenti AS u
            JOIN abbonamenti AS a ON u.id_abbonamento = a.id
            ORDER BY a.tipo, u.cognome";

    // ── STEP 4: Esecuzione query ─────────────────────────────
    $rs = $con->query($sql);

    // ── STEP 5: Controllo esito query ────────────────────────
    if (!$rs) {
        $con->close();
        die("Query fallita: " . $con->errno . " - " . $con->error);
    }

    // ── STEP 6: Distribuisco le righe nei 3 array ────────────
    // Creo 3 array vuoti, uno per tipo abbonamento
    $premium  = [];
    $standard = [];
    $base     = [];

    // fetch_assoc() legge una riga alla volta come array associativo
    // Il while va avanti finché ci sono righe
    while ($row = $rs->fetch_assoc()) {
        // Uso il campo "tipo" (stringa) NON l'id numerico!
        if ($row["tipo"] == "premium") {
            $premium[] = $row;
        } elseif ($row["tipo"] == "standard") {
            $standard[] = $row;
        } else {
            $base[] = $row;
        }
    }

    // ── STEP 7: Stampo l'HTML con le 3 colonne ───────────────
    echo '<div class="container mt-4">';
    echo '<h1 class="fw-bold">Abbonati alla piattaforma</h1>';
    echo '<p class="text-muted">Clicca su una card per vedere i dettagli dell\'abbonamento</p>';
    echo '<div class="row">';

    // ── COLONNA 1: PREMIUM ───────────────────────────────────
    echo '<div class="col-4">';
    // count() → numero di elementi nell'array
    echo '<h5>⭐ Premium <span class="badge bg-dark">' . count($premium) . '</span></h5>';
    foreach ($premium as $utente) {
        // Ogni card è un link a dettaglio.php con l'id nell'URL
        echo '<a href="dettaglio.php?id=' . $utente["id"] . '" class="link-card">';
        echo '<div class="card-utente">';
        echo '<strong>' . $utente["nome"] . ' ' . $utente["cognome"] . '</strong><br>';
        echo '<small class="text-muted">✉ ' . $utente["email"] . '</small><br>';
        echo '<small>📍 ' . $utente["citta"] . '</small>';
        echo '</div></a>';
    }
    echo '</div>';

    // ── COLONNA 2: STANDARD ──────────────────────────────────
    echo '<div class="col-4">';
    echo '<h5>🥈 Standard <span class="badge bg-dark">' . count($standard) . '</span></h5>';
    foreach ($standard as $utente) {
        echo '<a href="dettaglio.php?id=' . $utente["id"] . '" class="link-card">';
        echo '<div class="card-utente">';
        echo '<strong>' . $utente["nome"] . ' ' . $utente["cognome"] . '</strong><br>';
        echo '<small class="text-muted">✉ ' . $utente["email"] . '</small><br>';
        echo '<small>📍 ' . $utente["citta"] . '</small>';
        echo '</div></a>';
    }
    echo '</div>';

    // ── COLONNA 3: BASE ───────────────────────────────────────
    echo '<div class="col-4">';
    echo '<h5>⚫ Base <span class="badge bg-dark">' . count($base) . '</span></h5>';
    foreach ($base as $utente) {
        echo '<a href="dettaglio.php?id=' . $utente["id"] . '" class="link-card">';
        echo '<div class="card-utente">';
        echo '<strong>' . $utente["nome"] . ' ' . $utente["cognome"] . '</strong><br>';
        echo '<small class="text-muted">✉ ' . $utente["email"] . '</small><br>';
        echo '<small>📍 ' . $utente["citta"] . '</small>';
        echo '</div></a>';
    }
    echo '</div>';

    echo '</div>'; // fine row

    // ── Pulsante Torna alla Home ─────────────────────────────
    // Semplice link GET → ricarica index.php senza POST
    echo '<div class="mt-4 mb-4">';
    echo '<a href="index.php" class="btn btn-secondary">← Torna alla home</a>';
    echo '</div>';
    echo '</div>'; // fine container

    // ── STEP 8: Chiudo la connessione ────────────────────────
    $con->close();
}
?>

</body>
</html>
