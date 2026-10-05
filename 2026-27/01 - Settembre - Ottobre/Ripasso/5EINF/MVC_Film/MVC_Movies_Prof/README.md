# es-mvc-ajax-film_v1

Esercizio base MVC + AJAX (stile v1) su tema **film da vedere**.

## Cosa fa
- `GET ?action=getAll` -> ritorna lista film in JSON
- `GET ?action=getAll&q=...` -> ricerca film per titolo
- `POST ?action=inserisci` -> inserisce un nuovo film (body JSON)
- `DELETE ?action=elimina&id=...` -> elimina un film
- `PATCH ?action=modificaTitolo&id=...` -> modifica il titolo di un film

## Struttura
- `index.php` router
- `controllers/FilmController.php`
- `models/Film.php`
- `views/index.html`
- `js/index.js`, `js/libreria.js`
- `config/database.php`
- `db/film.sql`

## Avvio rapido
1. Importa `db/film.sql` in phpMyAdmin.
2. Avvia Apache e MySQL da XAMPP.
3. Apri `http://localhost:8080/2025_26/EsPHP/es-mvc-ajax-film_v1/`

