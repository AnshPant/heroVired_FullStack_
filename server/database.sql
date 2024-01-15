CREATE DATABASE mashle;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE Programs (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Domain VARCHAR(50),
    ProgramType VARCHAR(50),
    Registrations VARCHAR(10) CHECK (Registrations IN ('open', 'closed')),
    Description TEXT,
    PlacementAssurance VARCHAR(3) CHECK (PlacementAssurance IN ('Yes', 'No')),
    ImageUrl VARCHAR(255),
    UniversityName VARCHAR(100),
    FacultyProfileUrl VARCHAR(255),
    LearningHours INT,
    Duration VARCHAR(50),
    CertificateDiploma VARCHAR(20),
    EligibilityCriteria TEXT
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    MailId VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);
