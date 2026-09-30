CREATE DATABASE IF NOT EXISTS `motogp_mvc`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `motogp_mvc`;

DROP TABLE IF EXISTS `gare`;
DROP TABLE IF EXISTS `piloti`;
DROP TABLE IF EXISTS `circuiti`;

CREATE TABLE `piloti` (
    `id`    INT NOT NULL AUTO_INCREMENT,
    `nome`  VARCHAR(100) NOT NULL,
    `team`  VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `circuiti` (
    `id`        INT NOT NULL AUTO_INCREMENT,
    `nome`      VARCHAR(100) NOT NULL,
    `paese`     VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `gare` (
    `id`               INT NOT NULL AUTO_INCREMENT,
    `stagione`         INT NOT NULL,
    `round`            INT NOT NULL,
    `data_ora`         DATETIME NOT NULL,
    `circuito_id`      INT NOT NULL,
    `pilota_id`        INT NOT NULL,
    `stato`            VARCHAR(20) NOT NULL DEFAULT 'programmata',
    `posizione_arrivo` INT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_gare_circuiti` FOREIGN KEY (`circuito_id`) REFERENCES `circuiti`(`id`),
    CONSTRAINT `fk_gare_piloti`   FOREIGN KEY (`pilota_id`)   REFERENCES `piloti`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `piloti` (`nome`, `team`) VALUES
('Francesco Bagnaia',  'Ducati Lenovo Team'),
('Jorge Martin',       'Prima Pramac Racing'),
('Marc Marquez',       'Gresini Racing MotoGP'),
('Enea Bastianini',    'Ducati Lenovo Team'),
('Fabio Quartararo',   'Monster Energy Yamaha');

INSERT INTO `circuiti` (`nome`, `paese`) VALUES
('Losail International Circuit',   'Qatar'),
('Portimao',                       'Portogallo'),
('Circuit of the Americas',        'USA'),
('Autodromo del Mugello',          'Italia'),
('Circuit de Barcelona-Catalunya', 'Spagna');

INSERT INTO `gare` (`stagione`, `round`, `data_ora`, `circuito_id`, `pilota_id`, `stato`, `posizione_arrivo`) VALUES
(2026, 1, '2026-03-01 20:00:00', 1, 1, 'finale',       1),
(2026, 2, '2026-03-23 15:00:00', 2, 2, 'finale',       3),
(2026, 3, '2026-04-13 21:00:00', 3, 3, 'programmata',  NULL),
(2026, 4, '2026-06-01 14:00:00', 4, 1, 'programmata',  NULL),
(2026, 5, '2026-06-22 14:00:00', 5, 4, 'programmata',  NULL);

