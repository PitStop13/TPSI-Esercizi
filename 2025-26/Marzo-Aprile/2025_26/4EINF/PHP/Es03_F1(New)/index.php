<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <title>EsFormula1</title>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <h1>Formula1</h1>
            </div>
            <div class="col-4"></div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <?php
                //gare
                $con = mysqli_connect("localhost", "root", "", "4e_f1(new)");

                // 2: Controllo se la connessione è avvenuta con successo
                if ($con->connect_errno) {
                    $txtConnectErrno = $con->connect_errno;
                    $txtConnectError = $con->connect_error;
                    die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                }

                // 3: Query SQL - Aggiunto ORDER BY per garantire che le risposte della stessa domanda siano vicine
                $sql = "SELECT * FROM races";

                // 4: Eseguo la query
                $rs = $con->query($sql);

                // 5: Controllo successo query
                if (!$rs) {
                    $txtErrno = $con->errno;
                    $txtError = $con->error;
                    $con->close();
                    die("Query fallita: $txtErrno : $txtError");
                }
                $str = "<form action='index.php' method='post'>";
                $str .= "<select name='gare'>";
                $str .= "<option value='-1' selected>Seleziona una gara</option>";
                while ($row = $rs->fetch_assoc()) {
                    $raceId = $row["RaceID"];
                    $name = $row["Name"];

                    $str .= "<option value ='$raceId'>$name</option>";

                }
                $str .= "</select>";
                $str .= "<input type='submit' value='Seleziona' name='btnGare'>";
                $str .= "</form>";
                echo $str;

                if (isset($_POST["btnGare"])) {
                    $race = $_POST["gare"];
                    $sql = "SELECT races.Name as NomeGara,races.Date as DataGara,races.Circuit as NomeCircuito,races.Country as NazioneCircuito,teams.Name as Team,drivers.Name as Pilota,results.Points as Punteggio
FROM drivers,teams,races,results
WHERE results.DriverID = drivers.DriverID AND results.TeamID = teams.TeamID AND results.RaceID = races.RaceID AND results.RaceID = $race;";
                    echo "Hai selezionato " . $race;
                }

                ?>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</body>

</html>