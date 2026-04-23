    -- Table for storing information about drivers
    CREATE TABLE Drivers (
        DriverID INT PRIMARY KEY,
        Name VARCHAR(100),
        Nationality VARCHAR(50),
             DATE,
        Number INT
    );

    -- Table for storing information about teams
    CREATE TABLE Teams (
        TeamID INT PRIMARY KEY,
        Name VARCHAR(100),
        Nationality VARCHAR(50),
        TeamPrincipal VARCHAR(100)
    );

    -- Table for storing information about races
    CREATE TABLE Races (
        RaceID INT PRIMARY KEY,
        Name VARCHAR(100),
        Date DATE,
        Circuit VARCHAR(100),
        Country VARCHAR(50)
    );

    -- Table for storing race results
    CREATE TABLE Results (
        ResultID INT PRIMARY KEY,
        RaceID INT,
        DriverID INT,
        TeamID INT,
        Position INT,
        GridPosition INT,
        Points INT,
        Status VARCHAR(50),
        CONSTRAINT fk_race FOREIGN KEY (RaceID) REFERENCES Races(RaceID),
        CONSTRAINT fk_driver FOREIGN KEY (DriverID) REFERENCES Drivers(DriverID),
        CONSTRAINT fk_team FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
    );


    -- Inserting sample data into Drivers table
    INSERT INTO Drivers (DriverID, Name, Nationality, DateOfBirth, Number) VALUES
    (1, 'Lewis Hamilton', 'British', '1985-01-07', 44),
    (2, 'Max Verstappen', 'Dutch', '1997-09-30', 33),
    (3, 'Valtteri Bottas', 'Finnish', '1989-08-28', 77);

    -- Inserting sample data into Teams table
    INSERT INTO Teams (TeamID, Name, Nationality, TeamPrincipal) VALUES
    (1, 'Mercedes', 'German', 'Toto Wolff'),
    (2, 'Red Bull Racing', 'Austrian', 'Christian Horner');

    -- Inserting sample data into Races table
    INSERT INTO Races (RaceID, Name, Date, Circuit, Country) VALUES
    (1, 'Australian Grand Prix', '2024-03-17', 'Albert Park Circuit', 'Australia'),
    (2, 'Bahrain Grand Prix', '2024-03-31', 'Bahrain International Circuit', 'Bahrain');

    -- Inserting sample data into Results table
    INSERT INTO Results (ResultID, RaceID, DriverID, TeamID, Position, GridPosition, Points, Status) VALUES
    (1, 1, 1, 1, 1, 1, 25, 'Finished'),
    (2, 1, 2, 2, 2, 2, 18, 'Finished'),
    (3, 1, 3, 1, 3, 3, 15, 'Finished'),
    (4, 2, 1, 1, 1, 1, 25, 'Finished'),
    (5, 2, 2, 2, 2, 2, 18, 'Finished'),
    (6, 2, 3, 1, 3, 3, 15, 'Finished');