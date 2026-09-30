CREATE DATABASE IF NOT EXISTS 4e_biblioteca_scuola;
USE 4e_biblioteca_scuola;

DROP TABLE IF EXISTS libri;
DROP TABLE IF EXISTS autori;

CREATE TABLE autori (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL
);

CREATE TABLE libri (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(120) NOT NULL,
    anno_pubblicazione INT NOT NULL DEFAULT 0,
    autore_id INT UNSIGNED NOT NULL,
    CONSTRAINT fk_libri_autori
        FOREIGN KEY (autore_id) REFERENCES autori(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO autori (nome, cognome) VALUES
('Alessandro', 'Manzoni'),
('Elsa', 'Morante'),
('Primo', 'Levi'),
('Italo', 'Calvino'),
('Dante', 'Alighieri'),
('Giovanni', 'Boccaccio'),
('Francesco', 'Petrarca'),
('Gabriele', 'DAnnunzio');

INSERT INTO libri (titolo, anno_pubblicazione, autore_id) VALUES
('I Promessi Sposi', 1840, 1),
('La Storia', 1974, 2),
('Se questo e un uomo', 1947, 3),
('Il barone rampante', 1957, 4),
('La Divina Commedia', 1320, 5),
('Decameron', 1353, 6),
('Africa', 1353, 7),
('Il Fuoco', 1914, 8);