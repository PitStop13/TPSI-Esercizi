CREATE DATABASE IF NOT EXISTS `spotifydb`
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE `spotifydb`;

DROP TABLE IF EXISTS `canzoni`;

CREATE TABLE `canzoni` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `titolo` VARCHAR(255) NOT NULL,
    `artista` VARCHAR(255) NOT NULL,
    `album` VARCHAR(255),
    `anno` INT,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `canzoni` (`titolo`, `artista`, `album`, `anno`) VALUES
    ('Blinding Lights', 'The Weeknd', 'After Hours', 2019),
    ('Shape of You', 'Ed Sheeran', '÷', 2017),
    ('Someone You Loved', 'Lewis Capaldi', 'Divinely Uninspired to a Hellish Extent', 2018),
    ('As It Was', 'Harry Styles', 'Harry''s House', 2022),
    ('Anti-Hero', 'Taylor Swift', 'Midnights', 2022),
    ('Heat Waves', 'Glass Animals', 'Dreamland', 2020);


