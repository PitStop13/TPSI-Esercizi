<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <title>Risultato del Test</title>
</head>

<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2 text-center">
                <h1>Esito del Test</h1>
                <hr>
                <?php
                // 1: Connessione al database
                $con = mysqli_connect("localhost", "root", "", "4e_onlitest");

                if ($con->connect_errno) {
                    die("Connessione fallita: " . $con->connect_error);
                }

                // 2: Query per ottenere SOLO le risposte corrette
                $sql = "SELECT domande.ID, domande.Testo as domanda, risposte.Testo as risposta_corretta 
                        FROM domande 
                        JOIN risposte ON domande.ID = risposte.DomandaID 
                        WHERE risposte.Corretta = 1 
                        ORDER BY domande.ID";

                $rs = $con->query($sql);

                if (!$rs) {
                    die("Errore nella query: " . $con->error);
                }

                $punteggio = 0;
                $totaleDomande = $rs->num_rows; // Numero totale di domande per il punteggio finale
                $cnt = 0;

                echo "<ul class='list-group text-left mb-4'>";

                // 3: Ciclo sui risultati del DB e confronto con i dati inviati (GET)
                while ($record = $rs->fetch_assoc()) {
                    $nomeInput = "domanda" . $cnt;

                    // Recupero la risposta data dall'utente dall'URL (array $_GET)
                    $rispostaUtente = isset($_POST[$nomeInput]) ? $_POST[$nomeInput] : "Nessuna risposta";
                    $rispostaCorretta = $record["risposta_corretta"];

                    echo "<li class='list-group-item'>";
                    echo "<strong>Domanda:</strong> " . $record["domanda"] . "<br>";
                    echo "La tua risposta: <i>$rispostaUtente</i><br>";

                    if ($rispostaUtente === $rispostaCorretta) {
                        echo "<span class='text-success font-weight-bold'>Corretto! ✅</span>";
                        $punteggio++;
                    } else {
                        echo "<span class='text-danger font-weight-bold'>Sbagliato! ❌</span> ";
                        echo "(La risposta corretta era: <b>$rispostaCorretta</b>)";
                    }
                    echo "</li>";

                    $cnt++;
                }

                echo "</ul>";

                // 4: Mostro il punteggio finale
                echo "<div class='alert alert-info'>";
                echo "<h3>Hai totalizzato $punteggio su $totaleDomande punti!</h3>";
                echo "</div>";

                echo "<a href='index.php' class='btn btn-secondary'>Riprova il test</a>";

                $con->close();
                ?>
            </div>
        </div>
    </div>
</body>

</html>