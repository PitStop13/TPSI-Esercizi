CREATE DATABASE IF NOT EXISTS amazon_scuola;
USE amazon_scuola;

DROP TABLE IF EXISTS righe_ordine;
DROP TABLE IF EXISTS ordini;
DROP TABLE IF EXISTS prodotti;
DROP TABLE IF EXISTS categorie;

CREATE TABLE categorie (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descrizione VARCHAR(255)
);

CREATE TABLE prodotti (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descrizione TEXT,
    prezzo DECIMAL(8,2) NOT NULL,
    quantita_disponibile INT UNSIGNED NOT NULL,
    valutazione DECIMAL(3,1) NOT NULL,
    prime BOOLEAN NOT NULL DEFAULT FALSE,
    categoria_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_prodotti_categorie
        FOREIGN KEY (categoria_id) REFERENCES categorie(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);






CREATE TABLE ordini (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(100) NOT NULL,
    data_ordine DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    totale DECIMAL(10,2) NOT NULL
);

CREATE TABLE righe_ordine (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ordine_id INT UNSIGNED NOT NULL,
    prodotto_id INT UNSIGNED NOT NULL,
    quantita INT UNSIGNED NOT NULL,
    prezzo_unitario DECIMAL(8,2) NOT NULL,
    CONSTRAINT fk_righe_ordine_ordini
        FOREIGN KEY (ordine_id) REFERENCES ordini(id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_righe_ordine_prodotti
        FOREIGN KEY (prodotto_id) REFERENCES prodotti(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO categorie (nome, descrizione) VALUES
('Informatica', 'Notebook, accessori e periferiche'),
('Casa', 'Prodotti per la casa e la cucina'),
('Libri', 'Libri scolastici e romanzi'),
('Gaming', 'Console e videogiochi');

INSERT INTO prodotti (nome, descrizione, prezzo, quantita_disponibile, valutazione, prime, categoria_id) VALUES
('Mouse wireless Logitech', 'Mouse ergonomico con collegamento wireless USB', 24.90, 15, 4.7, TRUE, 1),
('Tastiera meccanica RGB', 'Tastiera da gaming con illuminazione RGB', 59.90, 8, 4.8, TRUE, 1),
('Monitor 24 pollici Full HD', 'Monitor LED adatto a studio e ufficio', 149.99, 0, 4.5, FALSE, 1),
('Friggitrice ad aria 5L', 'Friggitrice digitale con 8 programmi', 89.50, 10, 4.4, TRUE, 2),
('Set pentole inox', 'Batteria da cucina da 6 pezzi', 69.90, 0, 4.2, FALSE, 2),
('Lampada da scrivania LED', 'Lampada con luce regolabile e presa USB', 32.00, 20, 4.6, TRUE, 2),
('Il fu Mattia Pascal', 'Romanzo di Luigi Pirandello', 10.50, 30, 4.3, FALSE, 3),
('Manuale di Informatica', 'Libro scolastico introduttivo di informatica', 27.90, 18, 4.9, TRUE, 3),
('Controller wireless', 'Controller compatibile con PC e console', 44.90, 9, 4.5, TRUE, 4),
('Gioco di guida racing', 'Videogioco automobilistico per console', 39.99, 0, 4.1, FALSE, 4);

