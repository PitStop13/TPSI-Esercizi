-- Database per gestione Scuola (PHP4EINF_SCUOLA)
CREATE DATABASE IF NOT EXISTS `scuola`;
USE `scuola`;

-- ===================== TABELLA INSEGNANTI =====================
CREATE TABLE `insegnanti` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `materia` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100),
    `telefono` VARCHAR(20),
    `anni_esperienza` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ===================== TABELLA CLASSI =====================
CREATE TABLE `classi` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(50) NOT NULL,
    `sezione` VARCHAR(10) NOT NULL,
    `anno_scolastico` VARCHAR(20),
    `num_studenti` INT,
    `aula` VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ===================== TABELLA STUDENTI =====================
CREATE TABLE `studenti` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL,
    `cognome` VARCHAR(100) NOT NULL,
    `data_nascita` DATE,
    `email` VARCHAR(100),
    `classe` VARCHAR(50),
    `media_voti` DECIMAL(3,2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ===================== TABELLA AULE =====================
CREATE TABLE `aule` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `numero_aula` VARCHAR(50) NOT NULL,
    `piano` INT,
    `capienza` INT,
    `tipo` VARCHAR(50),
    `attrezzature` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ===================== TABELLA ORARI =====================
CREATE TABLE `orari` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `classe` VARCHAR(50) NOT NULL,
    `materia` VARCHAR(100) NOT NULL,
    `insegnante` VARCHAR(100) NOT NULL,
    `giorno` VARCHAR(20),
    `ora_inizio` TIME,
    `ora_fine` TIME,
    `aula` VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ===================== INSERIMENTO DATI - INSEGNANTI =====================
INSERT INTO `insegnanti` (`nome`, `materia`, `email`, `telefono`, `anni_esperienza`) VALUES
('Mario Rossi', 'Matematica', 'mario.rossi@scuola.it', '333-1234567', 15),
('Anna Bianchi', 'Italiano', 'anna.bianchi@scuola.it', '333-2345678', 10),
('Giovanni Verdi', 'Inglese', 'giovanni.verdi@scuola.it', '333-3456789', 8),
('Francesca Neri', 'Informatica', 'francesca.neri@scuola.it', '333-4567890', 5),
('Paolo Ferrari', 'Scienze', 'paolo.ferrari@scuola.it', '333-5678901', 12);

-- ===================== INSERIMENTO DATI - CLASSI =====================
INSERT INTO `classi` (`nome`, `sezione`, `anno_scolastico`, `num_studenti`, `aula`) VALUES
('Prima', 'A', '2025-2026', 25, 'A1'),
('Prima', 'B', '2025-2026', 24, 'A2'),
('Seconda', 'A', '2025-2026', 26, 'B1'),
('Terza', 'A', '2025-2026', 22, 'B2'),
('Quarta', 'A', '2025-2026', 23, 'C1');

-- ===================== INSERIMENTO DATI - STUDENTI =====================
INSERT INTO `studenti` (`nome`, `cognome`, `data_nascita`, `email`, `classe`, `media_voti`) VALUES
('Luca', 'Rossi', '2009-05-15', 'luca.rossi@studenti.it', '1A', 7.50),
('Giulia', 'Bianchi', '2009-08-22', 'giulia.bianchi@studenti.it', '1A', 8.75),
('Marco', 'Verdi', '2009-03-10', 'marco.verdi@studenti.it', '1B', 6.80),
('Elena', 'Ferrari', '2009-11-05', 'elena.ferrari@studenti.it', '2A', 8.20),
('Andrea', 'Russo', '2008-07-18', 'andrea.russo@studenti.it', '3A', 7.90),
('Sofia', 'Gallo', '2008-02-14', 'sofia.gallo@studenti.it', '4A', 8.50),
('Matteo', 'Conti', '2007-09-30', 'matteo.conti@studenti.it', '4A', 7.60);

-- ===================== INSERIMENTO DATI - AULE =====================
INSERT INTO `aule` (`numero_aula`, `piano`, `capienza`, `tipo`, `attrezzature`) VALUES
('A1', 1, 30, 'Classe', 'Lavagna, Proiettore, PC'),
('A2', 1, 30, 'Classe', 'Lavagna, Proiettore'),
('B1', 2, 28, 'Classe', 'Lavagna, Proiettore, PC, Webcam'),
('B2', 2, 28, 'Classe', 'Lavagna'),
('C1', 3, 25, 'Laboratorio Informatica', 'PC, Server, Stampante, Proiettore'),
('C2', 3, 20, 'Laboratorio Scienze', 'Microscopi, Becher, Provette, Tavoli di lavoro');

-- ===================== INSERIMENTO DATI - ORARI =====================
INSERT INTO `orari` (`classe`, `materia`, `insegnante`, `giorno`, `ora_inizio`, `ora_fine`, `aula`) VALUES
('1A', 'Matematica', 'Mario Rossi', 'Lunedì', '08:00:00', '09:00:00', 'A1'),
('1A', 'Italiano', 'Anna Bianchi', 'Martedì', '09:00:00', '10:00:00', 'A1'),
('1A', 'Inglese', 'Giovanni Verdi', 'Mercoledì', '10:00:00', '11:00:00', 'A1'),
('1B', 'Matematica', 'Mario Rossi', 'Lunedì', '11:00:00', '12:00:00', 'A2'),
('2A', 'Informatica', 'Francesca Neri', 'Giovedì', '14:00:00', '15:30:00', 'C1'),
('3A', 'Scienze', 'Paolo Ferrari', 'Venerdì', '08:00:00', '09:30:00', 'C2'),
('4A', 'Informatica', 'Francesca Neri', 'Lunedì', '13:00:00', '14:30:00', 'C1');

