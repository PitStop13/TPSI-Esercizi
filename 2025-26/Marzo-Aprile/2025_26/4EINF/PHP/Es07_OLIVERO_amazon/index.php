<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap.css">
    <title>Olivero Pietro Verifica</title>
    <style>
        .card-prodotto {
            border: 1px solid #dee2e6;
            border-radius: 6px;
            padding: 10px 12px;
            margin-bottom: 10px;
            background-color: #f8f9fa;
            transition: background-color 0.2s;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-dark bg-dark">
    <div class="container">
        <span class="navbar-brand fw-bold">Amazon Scuola</span>
        <strong>Compito di Olivero Pietro</strong>
    </div>
    </nav>

    <?php
                $con = mysqli_connect("localhost", "root", "", "amazon_scuola");

                // 2: Controllo se la connessione è avvenuta con successo
                if ($con->connect_errno) {
                    $txtConnectErrno = $con->connect_errno;
                    $txtConnectError = $con->connect_error;
                    die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                }

                $sql = "SELECT * FROM categorie";

                $rs = $con->query($sql);

                if (!$rs) {
                    $txtErrno = $con->errno;
                    $txtError = $con->error;
                    $con->close();
                    die("Query fallita: $txtErrno : $txtError");
                }
                $str = "<form action='index.php' method='post'>";
                $str .= "<select name='categorie'>";

                $str .= "<option value='0'>Tutte</option>";

                while ($row = $rs->fetch_assoc()) {
                    $cID = $row["id"];
                    $name = $row["nome"];
                    $str .= "<option value ='$cID'>$name</option>";

                }
                $str .= "</select>";
                $str .= "<input type='submit' class='btn btn-primary ml-2' value='Seleziona una categoria' name='btnCategorie'>";
                $str .= "<input type='submit' class='btn btn-secondary ml-2' value='Azzera Filtri' name='btnAzzCategorie'>";
                $str .= "<input type='submit' class='btn ml-2' value='Solo prime' name='btnSoloPrime'>";
                $str .= "<input type='submit' class='btn ml-2' value='Solo disponibili' name='btnSoloDisponibili'>";

                $str .= "</form>";  
                echo $str;

                if(isset($_POST["btnCategorie"])){

                    $cID= $_POST["categorie"];
                    
                    $con = mysqli_connect("localhost", "root", "", "amazon_scuola");

                    if ($con->connect_errno) {
                        $txtConnectErrno = $con->connect_errno;
                        $txtConnectError = $con->connect_error;
                        die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                    }
                    if($cID == 0){
                        $sql = "SELECT * FROM prodotti as p";
                    }else{
                        $sql = "SELECT * FROM prodotti as p where p.categoria_id = $cID";
                    }

                    $rs = $con->query($sql);

                    if (!$rs) {
                        $txtErrno = $con->errno;
                        $txtError = $con->error;
                        $con->close();
                        die("Query fallita: $txtErrno : $txtError");
                    }
                    $prodotti = [];
                    while ($row = $rs->fetch_assoc()) {
                        $prodotti[] = $row;
                    }
                    echo '<div class="container mt-4">';
                    echo '<div class="row">';
                    foreach ($prodotti as $prodotto) {
                        echo '<div class="card-prodotto mr-2">';
                        echo '<p>'.$prodotto["nome"] .'</p>';
                        echo '<p>Categoria: '. $cID . '</p>';
                        echo '<p>Prezzo: ' . $prodotto["prezzo"] . '</p>';
                        echo '<p>Valutazione: ' . $prodotto["valutazione"] . '</p>';
                        echo '<p>Disponibilità: ' . $prodotto["quantita_disponibile"] . '</p>';
                        if ($prodotto["prime"] == 1){
                            echo '<p>Prime: ✅ Si" </p>';
                        }else{
                            echo '<p>Prime: ❌ No" </p>';

                        }
                        if (intval($prodotto["quantita_disponibile"]) > 0){
                            echo '<p>Disponibilità: ✅ Disponibile" </p>';
                        }else{
                            echo '<p>Disponibilità: ❌ Non disponibile" </p>';

                        }
                        echo '</div>';
                    }
                    echo '</div>'; 
                    echo '</div>';
                }
                else{

                    $con = mysqli_connect("localhost", "root", "", "amazon_scuola");

                    if ($con->connect_errno) {
                        $txtConnectErrno = $con->connect_errno;
                        $txtConnectError = $con->connect_error;
                        die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                    }

                    $sql = "SELECT * FROM prodotti as p";

                    $rs = $con->query($sql);

                    if (!$rs) {
                        $txtErrno = $con->errno;
                        $txtError = $con->error;
                        $con->close();
                        die("Query fallita: $txtErrno : $txtError");
                    }
                    $prodotti = [];
                    while ($row = $rs->fetch_assoc()) {
                        $prodotti[] = $row;
                        
                    }
                    echo '<div class="container mt-4">';
                    echo '<div class="row">';
                    foreach ($prodotti as $prodotto) {
                        echo '<div class="card-prodotto mr-2">';
                        echo '<p>'.$prodotto["nome"] .'</p>';
                        echo '<p>Categoria: '. $cID . '</p>';
                        echo '<p>Prezzo: ' . $prodotto["prezzo"] . '</p>';
                        echo '<p>Valutazione: ' . $prodotto["valutazione"] . '</p>';
                        echo '<p>Disponibilità: ' . $prodotto["quantita_disponibile"] . '</p>';
                        if ($prodotto["prime"] == 1){
                            echo '<p>Prime: ✅ Si" </p>';
                        }else{
                            echo '<p>Prime: ❌ No" </p>';

                        }
                        if (intval($prodotto["quantita_disponibile"]) > 0){
                            echo '<p>Disponibilità: ✅ Disponibile" </p>';
                        }else{
                            echo '<p>Disponibilità: ❌ Non disponibile" </p>';

                        }
                        echo '</div>';
                    }
                    echo '</div>'; 
                    echo '</div>';
                }

                if(isset($_POST["btnSoloDisponibili"])){
                    $cID= $_POST["categorie"];
                    
                    $con = mysqli_connect("localhost", "root", "", "amazon_scuola");

                    if ($con->connect_errno) {
                        $txtConnectErrno = $con->connect_errno;
                        $txtConnectError = $con->connect_error;
                        die("Connessione fallita: $txtConnectErrno : $txtConnectError");
                    }
                    if($cID == 0){
                        $sql = "SELECT * FROM prodotti as p";
                    }else{
                        $sql = "SELECT * FROM prodotti as p where p.categoria_id = $cID AND (p.quantita_disponibile > 0) ";
                    }

                    $rs = $con->query($sql);

                    if (!$rs) {
                        $txtErrno = $con->errno;
                        $txtError = $con->error;
                        $con->close();
                        die("Query fallita: $txtErrno : $txtError");
                    }
                    $prodotti = [];
                    while ($row = $rs->fetch_assoc()) {
                        $prodotti[] = $row;
                    }
                    echo '<div class="container mt-4">';
                    echo '<div class="row">';
                    foreach ($prodotti as $prodotto) {
                        echo '<div class="card-prodotto mr-2">';
                        echo '<p>'.$prodotto["nome"] .'</p>';
                        echo '<p>Categoria: '. $cID . '</p>';
                        echo '<p>Prezzo: ' . $prodotto["prezzo"] . '</p>';
                        echo '<p>Valutazione: ' . $prodotto["valutazione"] . '</p>';
                        echo '<p>Disponibilità: ' . $prodotto["quantita_disponibile"] . '</p>';
                        if ($prodotto["prime"] == 1){
                            echo '<p>Prime: ✅ Si" </p>';
                        }else{
                            echo '<p>Prime: ❌ No" </p>';

                        }
                        if (intval($prodotto["quantita_disponibile"]) > 0){
                            echo '<p>Disponibilità: ✅ Disponibile" </p>';
                        }else{
                            echo '<p>Disponibilità: ❌ Non disponibile" </p>';

                        }
                        echo '</div>';
                    }
                    echo '</div>'; 
                    echo '</div>';
                }



    ?>
</body>
</html>