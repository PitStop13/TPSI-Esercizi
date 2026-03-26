<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Risultati</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            color: #333;
        }
        .result-card {
            background: white;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        h1 {
            margin-top: 0;
            color: #333;
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 1rem;
        }
        p {
            font-size: 1.1rem;
            margin: 0.8rem 0;
            background-color: #f9f9f9;
            padding: 12px;
            border-radius: 6px;
            border-left: 4px solid #007bff;
            text-align: left;
        }
        .btn-back {
            display: inline-block;
            margin-top: 2rem;
            padding: 10px 20px;
            background-color: #6c757d;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            transition: background-color 0.3s;
            font-weight: 600;
        }
        .btn-back:hover {
            background-color: #5a6268;
        }
    </style>
</head>
<body>
    <div class="result-card">
        <h1>Dati Ricevuti</h1>
        <?php

        // Verifica se i parametri 'user' e 'pwd' sono stati passati (GET)
        if (isset($_GET['user']) && isset($_GET['pwd'])) {

            $username = htmlspecialchars($_GET['user']);
            $password = htmlspecialchars($_GET['pwd']);
            
            echo "<p><strong>Username:</strong> $username</p>";
            echo "<p><strong>Password:</strong> $password</p>";

        } 
        // Verifica se i parametri 'name' e 'age' sono stati passati (POST)
        elseif (isset($_POST["name"]) && isset($_POST["age"])) {
            $name = htmlspecialchars($_POST["name"]);
            $age = htmlspecialchars($_POST["age"]);
            
            echo "<p><strong>Name:</strong> $name</p>";
            echo "<p><strong>Age:</strong> $age</p>";
        } else {
            echo "<p style='border-left-color: #dc3545;'>Nessun parametro valido ricevuto.</p>";
        }
        ?>
        
        <a href="index.php" class="btn-back">Torna Indietro</a>
    </div>
</body>
</html>