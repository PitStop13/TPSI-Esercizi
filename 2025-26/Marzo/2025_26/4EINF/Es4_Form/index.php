<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Moderno</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            gap: 2rem;
            padding: 20px;
        }

        .login-card {
            background: white;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 350px;
            transition: transform 0.3s ease;
        }

        .login-card:hover {
            transform: translateY(-5px);
        }

        h2 {
            margin-top: 0;
            margin-bottom: 1.5rem;
            color: #333;
            text-align: center;
            font-weight: 600;
        }

        .form-group {
            margin-bottom: 1.2rem;
        }

        label {
            display: block;
            margin-bottom: .5rem;
            font-weight: 600;
            color: #555;
            font-size: 0.9rem;
        }

        input {
            width: 100%;
            padding: 12px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s, box-shadow 0.3s;
        }

        input:focus {
            border-color: #007bff;
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
            transition: background-color 0.3s, transform 0.1s;
        }

        button:hover {
            background-color: #0056b3;
        }

        button:active {
            transform: scale(0.98);
        }

    </style>
</head>

<body>

    <div class="login-card">
        <h2>Login</h2>
        <!-- il metodo GET invia i dati tramite l'URL -->
        <form action="risultati.php" method="get">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="user" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="pwd" required>
            </div>

            <button type="submit">Accedi</button>
        </form>

    </div>
    
    <div class="login-card">
        <h2>Login</h2>
        <!-- Il metodo post invia i dati nel corpo della richiesta -->
        <form action="risultati.php" method="post">
            <div class="form-group">
                <label for="name">Nome</label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="form-group">
                <label for="age">Età</label>
                <input type="number" id="age" name="age" required>
            </div>

            <button type="submit" value="InvioDatiConPost">Accedi</button>
        </form>
    </div>

</body>

</html>