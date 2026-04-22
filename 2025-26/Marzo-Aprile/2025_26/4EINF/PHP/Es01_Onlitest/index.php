<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Es Onlitest</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <h1>Es Onlitest</h1>
                <!-- Ora collego la pagina al database php -->
                <?php
                // 1: Collego la pagina al database
                $con = mysqli_connect("localhost", "root", "", "4e_onlitest");

                // 2: Controllo se la connessione è avvenuta con successo
                if ($con->connect_errno) {
                    $txtConnectErrno = $con->connect_errno;
                    $txtConnectError = $con->connect_error;
                    die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                }

                // 3: Query SQL - Aggiunto ORDER BY per garantire che le risposte della stessa domanda siano vicine
                $sql = "SELECT domande.Testo as domanda, risposte.Testo as risposta 
                        FROM domande, risposte 
                        WHERE domande.ID = risposte.DomandaID 
                        ORDER BY domande.ID";

                // 4: Eseguo la query
                $rs = $con->query($sql);

                // 5: Controllo successo query
                if (!$rs) {
                    $txtErrno = $con->errno;
                    $txtError = $con->error;
                    $con->close();
                    die("Query fallita: $txtErrno : $txtError");
                }

                // 6: Generazione del form
                $str = "<form action='risultato.php' method='post'>"; // Form inviato via POST
                
                $cntRisposta = 0; // Corretto nome variabile
                $cntDomanda = 0;

                while ($record = $rs->fetch_assoc()) {
                    // Uso la variabile corretta: $cntRisposta
                    switch ($cntRisposta) {
                        case 0:
                            $domanda = $record["domanda"];
                            $risposta1 = $record["risposta"];
                            break;
                        case 1:
                            $risposta2 = $record["risposta"];
                            break;
                        case 2:
                            $risposta3 = $record["risposta"];
                            break;
                        case 3:
                            $risposta4 = $record["risposta"];
                            break;
                    }

                    $cntRisposta++;

                    if ($cntRisposta == 4) {
                        $str .= "<h2>$domanda</h2>";
                        $str .= "<input type='radio' name='domanda$cntDomanda' value='$risposta1'> $risposta1 <br>";
                        $str .= "<input type='radio' name='domanda$cntDomanda' value='$risposta2'> $risposta2 <br>";
                        $str .= "<input type='radio' name='domanda$cntDomanda' value='$risposta3'> $risposta3 <br>";
                        $str .= "<input type='radio' name='domanda$cntDomanda' value='$risposta4'> $risposta4 <br>";
                        $str .= "<hr>"; // Un separatore visivo tra domande
                
                        $cntRisposta = 0; // Reset del contatore risposte per la prossima domanda
                        $cntDomanda++;
                    }
                }

                $str .= "<br>";
                $str .= "<input class='btn btn-primary' type='submit' value='Conferma risposta'>";
                $str .= "</form>";

                echo $str;

                $con->close();
                ?>
                <div class="selectDomande">
                    <h2>Select per la selezione delle domande</h2>
                    <!-- Slect con tutte le doande e poi sotto ancora un bottone con scritto trova risposta e in base alla domanda selezionata manda sulla pagina rispostaSelect.php dove vedo la domanda e la risposta -->
                    <form action="rispostaSelect.php" method="post">
                        <select name="domanda" id="domanda">
                            <option value="">Seleziona una domanda</option>
                            <?php
                            $con = mysqli_connect("localhost", "root", "", "4e_onlitest");
                            if ($con->connect_errno) {
                                $txtConnectErrno = $con->connect_errno;
                                $txtConnectError = $con->connect_error;
                                die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                            }

                            $sqlDomande = "SELECT ID, Testo FROM domande ORDER BY ID";
                            $rsDomande = $con->query($sqlDomande);
                                if (!$rsDomande) {
                                $txtErrno = $con->errno;
                                $txtError = $con->error;
                                $con->close();
                                die("Query fallita: $txtErrno : $txtError");
                            }
                            
                            if ($rsDomande && $rsDomande->num_rows > 0) {
                                while ($recordDomanda = $rsDomande->fetch_assoc()) {
                                    echo "<option value='" . $recordDomanda["ID"] . "'>" . $recordDomanda["Testo"] . "</option>";
                                }
                            } else {
                                echo "<option value=''>Nessuna domanda disponibile</option>";
                            }

                            $con->close();
                            ?>
                        </select>
                        <br><br>
                        <input class="btn btn-primary" type="submit" value="Trova risposta">
                    </form>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</body>

</html>