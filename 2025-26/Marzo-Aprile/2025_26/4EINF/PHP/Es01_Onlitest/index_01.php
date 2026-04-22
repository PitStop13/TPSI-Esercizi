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
                //1: Collego la pagina al database php
                $con = mysqli_connect("localhost","root","","4e_onlitest");
                //2: Controllo se la connessione è avvenuta con successo
                if ($con->connect_errno) {
                    $txtConnectErrno = $con->connect_errno; //Codice errore relativo alla connessione
                    $txtConnectError = $con->connect_error; //Messaggio di errore in caso di connessione fallita
                    //Chiusura immediata della connessione al database
                    $con->close();
                    die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                    //die("Connessione fallita: [".$txtConnectErrno."] : ".$txtConnectError.");
                }
                //3:Creazione query SQL per stampare tutte le domande presenti nel database
                $sql = "SELECT Testo FROM domande";
                //4: Stampo a video tutte le domande presenti nel database
                $rs = $con->query($sql);
                //5: Controllo se la query è stata eseguita con successo
                if(!$rs){
                    $txtErrno = $con->errno; //Codice errore relativo alla query
                    $txtError = $con->error; //Messaggio di errore in caso di query fallita
                    $con->close();
                    die("Query fallita: $txtErrno : $txtError");
                }
                //6: Stampo a video tutte le domande presenti nel database
                while($record = $rs->fetch_assoc()){
                    echo "<p>".$record["Testo"]."</p>";
                }

                // Uso questo per fare la Query per ottenre le domande e le risposte dall'sql
            ?>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</body>
</html>