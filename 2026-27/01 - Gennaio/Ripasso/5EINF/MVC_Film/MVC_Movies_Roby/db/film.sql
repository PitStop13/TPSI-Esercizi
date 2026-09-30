CREATE DATABASE IF NOT EXISTS `cineteca`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `cineteca`;

DROP TABLE IF EXISTS `film`;

CREATE TABLE `film` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `titolo` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `film` (`titolo`) VALUES
    ('Interstellar'),
    ('Inception'),
    ('The Matrix'),
    ('Il Signore degli Anelli');

