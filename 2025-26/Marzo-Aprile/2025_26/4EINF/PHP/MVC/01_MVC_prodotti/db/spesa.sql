-- ============================================================
--  DATABASE: spesa
-- ============================================================
CREATE DATABASE IF NOT EXISTS `spesa`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `spesa`;

CREATE TABLE IF NOT EXISTS `prodotti` (
    `id`      INT          NOT NULL AUTO_INCREMENT,
    `nome`    VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `prodotti` (`nome`) VALUES
    ('Latte'),
    ('Pane'),
    ('Uova'),
    ('Pasta'),
    ('Pomodori');

