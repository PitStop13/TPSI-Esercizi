<?php
$risultatoGet = "";
if (isset($_GET["nome"]) && isset($_GET["eta"])) {
    $nome = $_GET["nome"];
    $eta = $_GET["eta"];
    $risultatoGet = "GET -> CIAO $nome, hai $eta anni";


}

$risultatoPost = "";
if (isset($_POST["nome"]) && isset($_POST["eta"])) {
    $nome = $_POST["nome"];
    $eta = $_POST["eta"];
    $risultatoPost = "GET -> CIAO $nome, hai $eta anni";


}
?>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Es 5 GET post</title>
</head>

<body>
    <h1>Form con metodo GET</h1>
    <!-- Se non inserisco niente in action, richiama se stessa -->
    <form action="" method="GET">
        Nome: <input type="text" name="nome">
        <br><br>
        Eta: <input type="number" name="eta">
        <br><br>
        <input type="submit" value="Invia con GET">
    </form>
    <p><?= $risultatoGet ?></p>

    <br><br><br><br>

    <form action="" method="POST">
        Nome: <input type="text" name="nome">
        <br><br>
        Eta: <input type="number" name="eta">
        <br><br>
        <input type="submit" value="Invia con POST">
        <p>
            <?= $risultatoPost ?>
        </p>


    </form>
</body>


</html>