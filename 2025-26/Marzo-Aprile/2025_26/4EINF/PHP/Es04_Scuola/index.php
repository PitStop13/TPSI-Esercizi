<?php
$con = mysqli_connect("localhost", "root", "", "4e_scuola");
if ($con->connect_errno) {
    die("Connessione fallita: " . $con->connect_errno . " : " . $con->connect_error);
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Gestione Scuola</title>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>Gestione Scuola</h1>
        <p>Esercizio PHP4EINF - Visualizzazione Tabelle</p>
    </div>

    <!-- 1. INSEGNANTI -->
    <div class="section">
        <div class="section-title">👨‍🏫 Insegnanti</div>
        <div class="form-container">
            <form action="" method="GET">
                <label>Seleziona un insegnante:</label>
                <select name="insegnante">
                    <option value="">-- Scegli --</option>
                    <?php
                    $result = $con->query("SELECT id, nome, materia FROM insegnanti ORDER BY nome");
                    while ($row = $result->fetch_assoc()) {
                        $sel = "";
                        if (isset($_GET['insegnante']) && $_GET['insegnante'] == $row['id']) {
                            $sel = "selected";
                        }
                        echo "<option value='" . $row['id'] . "' " . $sel . ">" . $row['nome'] . " (" . $row['materia'] . ")</option>";
                    }
                    ?>
                </select>
                <button type="submit">Visualizza Dettagli</button>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Nome</th><th>Materia</th>
                        <th>Email</th><th>Telefono</th><th>Anni Esperienza</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (isset($_GET['insegnante']) && $_GET['insegnante'] != "") {
                        $id = intval($_GET['insegnante']);
                        $result = $con->query("SELECT * FROM insegnanti WHERE id = $id");
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['nome'] . "</td>";
                            echo "<td>" . $row['materia'] . "</td>";
                            echo "<td>" . $row['email'] . "</td>";
                            echo "<td>" . $row['telefono'] . "</td>";
                            echo "<td>" . $row['anni_esperienza'] . "</td>";
                            echo "</tr>";
                        }
                        
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 2. CLASSI -->
    <div class="section">
        <div class="section-title">🏫 Classi</div>
        <div class="form-container">
            <form action="" method="GET">
                <label>Seleziona una classe:</label>
                <select name="classe">
                    <option value="">-- Scegli --</option>
                    <?php
                    $result = $con->query("SELECT id, nome, sezione FROM classi ORDER BY nome, sezione");
                    while ($row = $result->fetch_assoc()) {
                        $sel = "";
                        if (isset($_GET['classe']) && $_GET['classe'] == $row['id']) {
                            $sel = "selected";
                        }
                        echo "<option value='" . $row['id'] . "' " . $sel . ">" . $row['nome'] . " " . $row['sezione'] . "</option>";
                    }
                    ?>
                </select>
                <button type="submit">Visualizza Dettagli</button>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Nome</th><th>Sezione</th>
                        <th>Anno Scolastico</th><th>Num Studenti</th><th>Aula</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (isset($_GET['classe']) && $_GET['classe'] != "") {
                        $id = intval($_GET['classe']);
                        $result = $con->query("SELECT * FROM classi WHERE id = $id");
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['nome'] . "</td>";
                            echo "<td>" . $row['sezione'] . "</td>";
                            echo "<td>" . $row['anno_scolastico'] . "</td>";
                            echo "<td>" . $row['num_studenti'] . "</td>";
                            echo "<td>" . $row['aula'] . "</td>";
                            echo "</tr>";
                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 3. STUDENTI -->
    <div class="section">
        <div class="section-title">🎓 Studenti</div>
        <div class="form-container">
            <form action="" method="GET">
                <label>Seleziona uno studente:</label>
                <select name="studente">
                    <option value="">-- Scegli --</option>
                    <?php
                    $result = $con->query("SELECT id, nome, cognome FROM studenti ORDER BY cognome, nome");
                    while ($row = $result->fetch_assoc()) {
                        $sel = "";
                        if (isset($_GET['studente']) && $_GET['studente'] == $row['id']) {
                            $sel = "selected";
                        }
                        echo "<option value='" . $row['id'] . "' " . $sel . ">" . $row['nome'] . " " . $row['cognome'] . "</option>";
                    }
                    ?>
                </select>
                <button type="submit">Visualizza Dettagli</button>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Nome</th><th>Cognome</th><th>Data Nascita</th>
                        <th>Email</th><th>Classe</th><th>Media Voti</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (isset($_GET['studente']) && $_GET['studente'] != "") {
                        $id = intval($_GET['studente']);
                        $result = $con->query("SELECT * FROM studenti WHERE id = $id");
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['nome'] . "</td>";
                            echo "<td>" . $row['cognome'] . "</td>";
                            echo "<td>" . $row['data_nascita'] . "</td>";
                            echo "<td>" . $row['email'] . "</td>";
                            echo "<td>" . $row['classe'] . "</td>";
                            echo "<td>" . $row['media_voti'] . "</td>";
                            echo "</tr>";
                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 4. AULE -->
    <div class="section">
        <div class="section-title">🚪 Aule</div>
        <div class="form-container">
            <form action="" method="GET">
                <label>Seleziona un'aula:</label>
                <select name="aula">
                    <option value="">-- Scegli --</option>
                    <?php
                    $result = $con->query("SELECT id, numero_aula, piano, tipo FROM aule ORDER BY numero_aula");
                    while ($row = $result->fetch_assoc()) {
                        $sel = "";
                        if (isset($_GET['aula']) && $_GET['aula'] == $row['id']) {
                            $sel = "selected";
                        }
                        echo "<option value='" . $row['id'] . "' " . $sel . ">Aula " . $row['numero_aula'] . " (Piano " . $row['piano'] . ", " . $row['tipo'] . ")</option>";
                    }
                    ?>
                </select>
                <button type="submit">Visualizza Dettagli</button>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Numero Aula</th><th>Piano</th>
                        <th>Capienza</th><th>Tipo</th><th>Attrezzature</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (isset($_GET['aula']) && $_GET['aula'] != "") {
                        $id = intval($_GET['aula']);
                        $result = $con->query("SELECT * FROM aule WHERE id = $id");
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['numero_aula'] . "</td>";
                            echo "<td>" . $row['piano'] . "</td>";
                            echo "<td>" . $row['capienza'] . "</td>";
                            echo "<td>" . $row['tipo'] . "</td>";
                            echo "<td>" . $row['attrezzature'] . "</td>";
                            echo "</tr>";
                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 5. ORARI LEZIONI -->
    <div class="section">
        <div class="section-title">⏰ Orari Lezioni</div>
        <div class="form-container">
            <form action="" method="GET">
                <label>Seleziona un orario:</label>
                <select name="orario">
                    <option value="">-- Scegli --</option>
                    <?php
                    $result = $con->query("SELECT id, classe, materia, giorno, ora_inizio FROM orari ORDER BY giorno, ora_inizio, classe");
                    while ($row = $result->fetch_assoc()) {
                        $sel = "";
                        if (isset($_GET['orario']) && $_GET['orario'] == $row['id']) {
                            $sel = "selected";
                        }
                        echo "<option value='" . $row['id'] . "' " . $sel . ">" . $row['classe'] . " - " . $row['materia'] . " (" . $row['giorno'] . " " . $row['ora_inizio'] . ")</option>";
                    }
                    ?>
                </select>
                <button type="submit">Visualizza Dettagli</button>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th><th>Classe</th><th>Materia</th><th>Insegnante</th>
                        <th>Giorno</th><th>Ora Inizio</th><th>Ora Fine</th><th>Aula</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if (isset($_GET['orario']) && $_GET['orario'] != "") {
                        $id = intval($_GET['orario']);
                        $result = $con->query("SELECT * FROM orari WHERE id = $id");
                        while ($row = $result->fetch_assoc()) {
                            echo "<tr>";
                            echo "<td>" . $row['id'] . "</td>";
                            echo "<td>" . $row['classe'] . "</td>";
                            echo "<td>" . $row['materia'] . "</td>";
                            echo "<td>" . $row['insegnante'] . "</td>";
                            echo "<td>" . $row['giorno'] . "</td>";
                            echo "<td>" . $row['ora_inizio'] . "</td>";
                            echo "<td>" . $row['ora_fine'] . "</td>";
                            echo "<td>" . $row['aula'] . "</td>";
                            echo "</tr>";
                        }
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<?php $con->close(); ?>
</body>
</html>