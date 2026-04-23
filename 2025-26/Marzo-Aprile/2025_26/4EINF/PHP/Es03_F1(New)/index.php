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
                <h3>Gare</h3>
                <?php
                session_start();
                
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

                if(isset($_POST["gare"])){
                    $_SESSION["gare"] = $_POST["gare"];
                }

                // 5: Controllo successo query
                if (!$rs) {
                    $txtErrno = $con->errno;
                    $txtError = $con->error;
                    $con->close();
                    die("Query fallita: $txtErrno : $txtError");
                }
                $str = "<form action='index.php' method='post'>";
                $str .= "<select name='gare'>";

                $str .= "<option value='-1'>Seleziona una gara</option>";
                while ($row = $rs->fetch_assoc()) {
                    $raceId = $row["RaceID"];
                    $name = $row["Name"];
                    if($_SESSION["gare"] == $raceId)
                    {
                        $str .= "<option value ='$raceId' selected>$name</option>";
                    }
                    else{
                        
                        $str .= "<option value ='$raceId'>$name</option>";
                    }

                }
                $str .= "</select>";
                $str .= "<input type='submit' value='Seleziona' name='btnGare'>";
                $str .= "</form>";
                echo $str;

                if (isset($_POST["btnGare"]) && $_POST["gare"] != -1 || isset($_SESSION["gare"]) && $_SESSION["gare"] != -1) {
                    $race = isset($_POST["gare"]) ? $_POST["gare"] : $_SESSION["gare"];
                    $sql = "SELECT races.Name as NomeGara,races.Date as DataGara,races.Circuit as NomeCircuito,races.Country as NazioneCircuito,teams.Name as Team,drivers.Name as Pilota,results.Points as Punteggio
                            FROM drivers,teams,races,results
                            WHERE results.DriverID = drivers.DriverID AND results.TeamID = teams.TeamID AND results.RaceID = races.RaceID AND results.RaceID = $race;";

                    $rs = $con->query($sql);
                    if (!$rs) {
                        $txtErrno = $con->errno;
                        $txtError = $con->error;
                        $con->close();
                        die("Query fallita: $txtErrno : $txtError");
                    }

                    $str = "<table class='table table-striped'>";
                    $str .= "<tr>
                                <th>Nome Gara</th>
                                <th>Data Gara</th>
                                <th>Nome Circuito</th>
                                <th>Nazione Circuito</th>
                                <th>Team</th>
                                <th>Pilota</th>
                                <th>Punteggio</th>
                            </tr>";
                    while ($row = $rs->fetch_assoc()) {
                        $str .= "<tr><td>" . $row["NomeGara"] . "</td><td>" . $row["DataGara"] . "</td><td>" . $row["NomeCircuito"] . "</td><td>" . $row["NazioneCircuito"] . "</td><td>" . $row["Team"] . "</td><td>" . $row["Pilota"] . "</td><td>" . $row["Punteggio"] . "</td></tr>";
                    }
                    $str .= "</table>";
                    echo $str;

                    //oppure
                    // echo "<table class='table table-striped'>
                    // <tr>
                    //      <th>Nome Gara</th>
                    //      <th>Data Gara</th>
                    //      <th>Nome Circuito</th>
                    //      <th>Nazione Circuito</th>
                    //      <th>Team</th>
                    //      <th>Pilota</th>
                    //      <th>Punteggio</th>
                    // </tr>";
                    // while ($row = $rs->fetch_assoc()) {
                    //    echo "
                    //         <tr>
                    //             <td>" . $row["NomeGara"] . "</td>
                    //             <td>" . $row["DataGara"] . "</td>
                    //             <td>" . $row["NomeCircuito"] . "</td>
                    //             <td>" . $row["NazioneCircuito"] . "</td>
                    //             <td>" . $row["Team"] . "</td>
                    //             <td>" . $row["Pilota"] . "</td>
                    //             <td>" . $row["Punteggio"] . "</td>
                    //         </tr>";
                    // }
                    // echo "</table>";
                }
                ?>
                <hr>
                <h3>Teams</h3>
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
                $sql = "SELECT * FROM teams";

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
                $str .= "<select name='teams'>";
                $str .= "<option value='-1' selected>Seleziona un team</option>";
                while ($row = $rs->fetch_assoc()) {
                    $teamId = $row["TeamID"];
                    $name = $row["Name"];
                    $str .= "<option value ='$teamId'>$name</option>";
                }
                $str .= "</select>";
                $str .= "<input type='submit' value='Seleziona' name='btnTeams'>";
                $str .= "</form>";
                echo $str;

                if (isset($_POST["btnTeams"]) && $_POST["teams"] != -1) {
                    $team = $_POST["teams"];
                    $sql = "SELECT DISTINCT teams.Name as NomeTeam,drivers.Name as Pilota,drivers.Nationality as Nazionalità,drivers.DateOfBirth as DataNascita
                            FROM drivers,teams,results
                            WHERE results.DriverID = drivers.DriverID AND results.TeamID = teams.TeamID AND results.TeamID = $team;";

                    $rs = $con->query($sql);
                    if (!$rs) {
                        $txtErrno = $con->errno;
                        $txtError = $con->error;
                        $con->close();
                        die("Query fallita: $txtErrno : $txtError");
                    }

                    $str = "<table class='table table-striped'>";
                    $str .= "<tr>
                                <th>Team</th>
                                <th>Pilota</th>
                                <th>Nazionalità</th>
                                <th>Data di Nascita</th>
                            </tr>";
                    while ($row = $rs->fetch_assoc()) {
                        $str .= "<tr>
                                    <td>" . $row["NomeTeam"] . "</td>
                                    <td>" . $row["Pilota"] . "</td>
                                    <td>" . $row["Nazionalità"] . "</td>
                                    <td>" . $row["DataNascita"] . "</td>
                                </tr>";
                    }
                    $str .= "</table>";
                    echo $str;
                }
                ?>
                <hr>
                <h3>Punteggi pilota</h3>
                <?php
                $con = mysqli_connect("localhost", "root", "", "4e_f1(new)");

                // 2: Controllo se la connessione è avvenuta con successo
                if ($con->connect_errno) {
                    $txtConnectErrno = $con->connect_errno;
                    $txtConnectError = $con->connect_error;
                    die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                }

                // 3: Query SQL - Aggiunto ORDER BY per garantire che le risposte della stessa domanda siano vicine
                $sql = "SELECT drivers.Name as Pilota, SUM(results.Points) as PunteggioTotale
                        FROM drivers,results
                        WHERE results.DriverID = drivers.DriverID
                        GROUP BY drivers.Name
                        ORDER BY PunteggioTotale DESC;";

                // 4: Eseguo la query
                $rs = $con->query($sql);

                $str = "<table class='table table-striped'>";
                $str .= "<tr>
                                <th>Pilota</th>
                                <th>Punteggio Totale</th>
                        </tr>";
                while ($row = $rs->fetch_assoc()) {
                    $str .= "<tr>
                                    <td>" . $row["Pilota"] . "</td>
                                    <td>" . $row["PunteggioTotale"] . "</td>
                            </tr>";
                }
                $str .= "</table>";
                echo $str;
                ?>
            </div>
            <div class="col-2"></div>
        </div>
    </div>
</body>

</html>