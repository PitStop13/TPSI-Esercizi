<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <title>Risposta domanda selezionata</title>
</head>

<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2 text-center">
                <h2>Dettaglio della domanda selezionata</h2>
                <hr>

                <?php
                // 1: Controllo se è stato inviato il parametro 'domanda' via POST e che non sia vuoto
                if (isset($_POST['domanda']) && !empty($_POST['domanda'])) {
                    
                    // Assicuro che l'ID sia un numero intero per sicurezza
                    $domandaID = intval($_POST['domanda']); 

                    // 2: Connessione al database (coerente con index.php e risultato.php)
                    $con = mysqli_connect("localhost", "root", "", "4e_onlitest");

                    // Controllo connessione
                    if ($con->connect_errno) {
                        die("<div class='alert alert-danger'>Connessione fallita: " . $con->connect_error . "</div>");
                    }

                    // 3: Query SQL per unire la tabella Domande con la tabella Risposte
                    // Filtriamo per l'ID della domanda selezionata e prendiamo solo la risposta corretta
                    $sql = "SELECT domande.Testo AS testo_domanda, risposte.Testo AS testo_risposta 
                            FROM domande 
                            JOIN risposte ON domande.ID = risposte.DomandaID 
                            WHERE domande.ID = $domandaID AND risposte.Corretta = 1";

                    $rs = $con->query($sql);

                    // Controllo se la query è andata a buon fine
                    if (!$rs) {
                        die("<div class='alert alert-danger'>Errore nella query: " . $con->error . "</div>");
                    }

                    // 4: Mostro i risultati
                    if ($rs->num_rows > 0) {
                        $record = $rs->fetch_assoc();
                        
                        echo "<div class='card text-left shadow-sm mt-4'>";
                        echo "  <div class='card-body'>";
                        echo "      <h5 class='text-muted'>Domanda:</h5>";
                        echo "      <p class='lead font-weight-bold'>" . $record['testo_domanda'] . "</p>";
                        echo "      <hr>";
                        echo "      <h5 class='text-success'>Risposta Corretta:</h5>";
                        echo "      <p class='lead'>" . $record['testo_risposta'] . " ✅</p>";
                        echo "  </div>";
                        echo "</div>";
                    } else {
                        // Nel caso in cui l'ID esista ma non abbia una risposta corretta associata
                        echo "<div class='alert alert-warning mt-4'>Nessuna risposta corretta trovata per questa domanda.</div>";
                    }

                    // 5: Chiusura della connessione
                    $con->close();

                } else {
                    // Se l'utente arriva sulla pagina senza aver selezionato nulla
                    echo "<div class='alert alert-warning mt-4'>Nessuna domanda selezionata dalla tendina.</div>";
                }
                ?>

                <div class="mt-4">
                    <a href="index.php" class="btn btn-secondary">Torna indietro</a>
                </div>
                
            </div>
        </div>
    </div>
</body>

</html>