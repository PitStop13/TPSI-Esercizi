-- ============================================================
--  DATABASE: streaming_tv
--  Piattaforma di abbonamenti TV Streaming
--  Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ============================================================

CREATE DATABASE IF NOT EXISTS 4e_streaming_tv
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE 4e_streaming_tv;
-- ------------------------------------------------------------
--  TABELLA: abbonamenti
--  Contiene i 3 piani disponibili: base, standard, premium
-- ------------------------------------------------------------
DROP TABLE IF EXISTS utenti;
DROP TABLE IF EXISTS abbonamenti;

CREATE TABLE abbonamenti (
    id                  INT             UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tipo                ENUM('base','standard','premium') NOT NULL,
    costo_mensile       DECIMAL(6,2)    NOT NULL COMMENT 'Prezzo mensile in euro',
    numero_dispositivi  TINYINT         UNSIGNED NOT NULL COMMENT 'Dispositivi registrabili sull account',
    schermi_simultanei  TINYINT         UNSIGNED NOT NULL COMMENT 'Stream contemporanei',
    risoluzione_massima VARCHAR(10)     NOT NULL COMMENT 'Es: 480p, 1080p, 4K',
    qualita_video       VARCHAR(30)     NOT NULL COMMENT 'Es: SD, Full HD, Ultra HD HDR',
    qualita_audio       VARCHAR(30)     NOT NULL COMMENT 'Es: Stereo, Dolby Atmos',
    download_offline    BOOLEAN         NOT NULL DEFAULT FALSE COMMENT 'Possibilita di scaricare contenuti',
    contenuti_esclusivi BOOLEAN         NOT NULL DEFAULT FALSE COMMENT 'Accesso a originals ed esclusive',
    pubblicita          BOOLEAN         NOT NULL DEFAULT TRUE  COMMENT 'Presenza di annunci pubblicitari',
    periodo_prova_giorni TINYINT        UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Giorni di prova gratuita',
    supporto_prioritario BOOLEAN        NOT NULL DEFAULT FALSE COMMENT 'Supporto clienti dedicato',
    descrizione         TEXT            COMMENT 'Descrizione del piano',
    creato_il           DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  DATI: 3 piani abbonamento
-- ------------------------------------------------------------
INSERT INTO abbonamenti
    (tipo, costo_mensile, numero_dispositivi, schermi_simultanei,
     risoluzione_massima, qualita_video, qualita_audio,
     download_offline, contenuti_esclusivi, pubblicita,
     periodo_prova_giorni, supporto_prioritario, descrizione)
VALUES
-- Piano BASE
('base', 5.99, 1, 1,
 '480p', 'SD', 'Stereo',
 FALSE, FALSE, TRUE,
 7, FALSE,
 'Piano base con pubblicità, un solo dispositivo e qualità standard. Ideale per chi vuole risparmiare.'),

-- Piano STANDARD
('standard', 11.99, 3, 2,
 '1080p', 'Full HD', 'Dolby Digital 5.1',
 TRUE, FALSE, FALSE,
 14, FALSE,
 'Piano standard senza pubblicità, Full HD e download offline su 2 dispositivi contemporaneamente.'),

-- Piano PREMIUM
('premium', 17.99, 6, 4,
 '4K', 'Ultra HD HDR', 'Dolby Atmos',
 TRUE, TRUE, FALSE,
 30, TRUE,
 'Piano premium top di gamma: 4K HDR, Dolby Atmos, contenuti esclusivi, 4 stream simultanei e supporto prioritario.');

-- ------------------------------------------------------------
--  TABELLA: utenti
--  Anagrafica utenti con chiave esterna verso abbonamenti
-- ------------------------------------------------------------
CREATE TABLE utenti (
    id              INT         UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(50) NOT NULL,
    cognome         VARCHAR(50) NOT NULL,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL COMMENT 'Hash bcrypt della password',
    telefono        VARCHAR(20),
    data_nascita    DATE        NOT NULL,
    indirizzo       VARCHAR(150),
    citta           VARCHAR(80),
    cap             CHAR(5),
    provincia       CHAR(2),
    id_abbonamento  INT         UNSIGNED NOT NULL,
    data_iscrizione DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    scadenza_abbonamento DATE   NOT NULL COMMENT 'Data di prossimo rinnovo',
    attivo          BOOLEAN     NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_utenti_abbonamenti
        FOREIGN KEY (id_abbonamento) REFERENCES abbonamenti(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  DATI: 15 utenti (password_hash simbolico '$2y$10$HASH...')
--  id_abbonamento: 1=base, 2=standard, 3=premium
-- ------------------------------------------------------------
INSERT INTO utenti
    (nome, cognome, email, password_hash, telefono,
     data_nascita, indirizzo, citta, cap, provincia,
     id_abbonamento, data_iscrizione, scadenza_abbonamento, attivo)
VALUES
('Marco',     'Rossi',      'marco.rossi@email.it',      '$2y$10$abc1', '3331234567', '1990-03-15', 'Via Roma 12',          'Torino',       '10121', 'TO', 3, '2025-01-10 09:00:00', '2026-05-10', TRUE),
('Giulia',    'Bianchi',    'giulia.bianchi@email.it',   '$2y$10$abc2', '3342345678', '1995-07-22', 'Corso Vittorio 33',    'Milano',       '20121', 'MI', 2, '2025-02-14 10:30:00', '2026-05-14', TRUE),
('Luca',      'Ferrari',    'luca.ferrari@email.it',     '$2y$10$abc3', '3353456789', '1988-11-05', 'Via Garibaldi 8',      'Roma',         '00184', 'RM', 1, '2025-03-01 08:15:00', '2026-06-01', TRUE),
('Alessia',   'Conti',      'alessia.conti@email.it',    '$2y$10$abc4', '3364567890', '1992-04-18', 'Via Manzoni 45',       'Napoli',       '80121', 'NA', 3, '2025-01-25 14:00:00', '2026-04-25', TRUE),
('Davide',    'Ricci',      'davide.ricci@email.it',     '$2y$10$abc5', '3375678901', '1985-09-30', 'Piazza Duomo 1',       'Firenze',      '50122', 'FI', 2, '2025-04-05 11:45:00', '2026-05-05', TRUE),
('Chiara',    'Lombardi',   'chiara.lombardi@email.it',  '$2y$10$abc6', '3386789012', '1998-12-10', 'Via Dante 77',         'Bologna',      '40121', 'BO', 1, '2025-05-20 16:00:00', '2026-05-20', TRUE),
('Matteo',    'Esposito',   'matteo.esposito@email.it',  '$2y$10$abc7', '3397890123', '1993-06-25', 'Corso Italia 22',      'Venezia',      '30121', 'VE', 3, '2025-06-01 09:30:00', '2026-06-01', TRUE),
('Sara',      'Gallo',      'sara.gallo@email.it',       '$2y$10$abc8', '3308901234', '1991-01-14', 'Via Po 56',            'Torino',       '10123', 'TO', 2, '2025-07-11 13:20:00', '2026-07-11', TRUE),
('Roberto',   'Mancini',    'roberto.mancini@email.it',  '$2y$10$abc9', '3319012345', '1980-08-08', 'Via Verdi 3',          'Genova',       '16121', 'GE', 1, '2025-08-22 07:00:00', '2026-08-22', TRUE),
('Federica',  'Bruno',      'federica.bruno@email.it',   '$2y$10$abca', '3321023456', '1997-02-28', 'Via Colombo 14',       'Bari',         '70121', 'BA', 2, '2025-09-03 10:00:00', '2026-09-03', TRUE),
('Simone',    'De Luca',    'simone.deluca@email.it',    '$2y$10$abcb', '3332034567', '1994-10-17', 'Viale Europa 89',      'Palermo',      '90121', 'PA', 3, '2025-09-15 15:30:00', '2026-09-15', TRUE),
('Valentina', 'Moretti',    'valentina.moretti@email.it','$2y$10$abcc', '3343045678', '1989-05-03', 'Via Leopardi 67',      'Catania',      '95121', 'CT', 1, '2025-10-01 08:45:00', '2026-10-01', TRUE),
('Antonio',   'Romano',     'antonio.romano@email.it',   '$2y$10$abcd', '3354056789', '1983-07-19', 'Corso Umberto 101',    'Milano',       '20122', 'MI', 2, '2025-10-20 12:00:00', '2026-10-20', TRUE),
('Elisa',     'Colombo',    'elisa.colombo@email.it',    '$2y$10$abce', '3365067890', '1996-03-07', 'Via Rossini 5',        'Verona',       '37121', 'VR', 3, '2025-11-05 09:15:00', '2026-11-05', TRUE),
('Giorgio',   'Fontana',    'giorgio.fontana@email.it',  '$2y$10$abcf', '3376078901', '1987-11-23', 'Via Tasso 38',         'Trieste',      '34121', 'TS', 1, '2025-12-01 17:00:00', '2026-12-01', FALSE);

-- ------------------------------------------------------------
--  QUERY DI VERIFICA (opzionali, commentate)
-- ------------------------------------------------------------
-- Tutti gli utenti con il loro piano:
-- SELECT u.nome, u.cognome, a.tipo, a.costo_mensile
-- FROM utenti u JOIN abbonamenti a ON u.id_abbonamento = a.id
-- ORDER BY a.tipo, u.cognome;

-- Conteggio utenti per tipo di abbonamento:
-- SELECT a.tipo, COUNT(u.id) AS totale_utenti
-- FROM abbonamenti a LEFT JOIN utenti u ON a.id = u.id_abbonamento
-- GROUP BY a.tipo;

