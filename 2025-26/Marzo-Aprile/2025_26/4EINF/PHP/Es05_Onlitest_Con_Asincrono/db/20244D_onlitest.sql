-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Mar 11, 2024 alle 12:08
-- Versione del server: 10.4.18-MariaDB
-- Versione PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `2024_onlitest`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `Domande`
--

CREATE TABLE `Domande` (
  `ID` int(11) NOT NULL,
  `Testo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `Domande`
--

INSERT INTO `Domande` (`ID`, `Testo`) VALUES
(1, 'Qual è la capitale del Giappone?'),
(2, 'Quale pianeta è conosciuto come \"la gemma del sistema solare\"?'),
(3, 'Chi è l\'autore de \"La Divina Commedia\"?'),
(4, 'Quale è la montagna più alta del mondo?'),
(5, 'Quale è l\'elemento chimico con simbolo \"Fe\"?'),
(6, 'Qual è l\'animale nazionale degli Stati Uniti?'),
(7, 'Quale è la lingua più parlata al mondo?'),
(8, 'Chi ha dipinto la \"Gioconda\"?'),
(9, 'Qual è la moneta ufficiale del Regno Unito?'),
(10, 'Quale è la più grande cascata del mondo?');

-- --------------------------------------------------------

--
-- Struttura della tabella `Risposte`
--

CREATE TABLE `Risposte` (
  `ID` int(11) NOT NULL,
  `DomandaID` int(11) DEFAULT NULL,
  `Testo` varchar(100) NOT NULL,
  `Corretta` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `Risposte`
--

INSERT INTO `Risposte` (`ID`, `DomandaID`, `Testo`, `Corretta`) VALUES
(1, 1, 'Tokyo', 1),
(2, 1, 'Pechino', 0),
(3, 1, 'Seoul', 0),
(4, 1, 'Bangkok', 0),
(5, 2, 'Giove', 0),
(6, 2, 'Terra', 0),
(7, 2, 'Venere', 1),
(8, 2, 'Marte', 0),
(9, 3, 'Dante Alighieri', 1),
(10, 3, 'Giovanni Boccaccio', 0),
(11, 3, 'Petrarca', 0),
(12, 3, 'Ugo Foscolo', 0),
(13, 4, 'Monte Everest', 1),
(14, 4, 'K2', 0),
(15, 4, 'Kangchenjunga', 0),
(16, 4, 'Lhotse', 0),
(17, 5, 'Ferro', 1),
(18, 5, 'Oro', 0),
(19, 5, 'Argento', 0),
(20, 5, 'Rame', 0),
(21, 6, 'Aquila', 0),
(22, 6, 'Bisonte', 0),
(23, 6, 'Orso', 1),
(24, 6, 'Aquila Calva', 0),
(25, 7, 'Cinese', 1),
(26, 7, 'Inglese', 0),
(27, 7, 'Spagnolo', 0),
(28, 7, 'Hindi', 0),
(29, 8, 'Leonardo da Vinci', 0),
(30, 8, 'Michelangelo', 0),
(31, 8, 'Raffaello', 0),
(32, 8, 'Leonardo da Vinci', 1),
(33, 9, 'Sterlina', 1),
(34, 9, 'Euro', 0),
(35, 9, 'Dollaro', 0),
(36, 9, 'Yen', 0),
(37, 10, 'Salto dell\'Angel', 0),
(38, 10, 'Cascate del Niagara', 1),
(39, 10, 'Victoria Falls', 0),
(40, 10, 'Iguazú', 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `Domande`
--
ALTER TABLE `Domande`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `Risposte`
--
ALTER TABLE `Risposte`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DomandaID` (`DomandaID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `Domande`
--
ALTER TABLE `Domande`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `Risposte`
--
ALTER TABLE `Risposte`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `Risposte`
--
ALTER TABLE `Risposte`
  ADD CONSTRAINT `risposte_ibfk_1` FOREIGN KEY (`DomandaID`) REFERENCES `Domande` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
