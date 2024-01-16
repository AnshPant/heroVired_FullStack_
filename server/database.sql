CREATE DATABASE mashle;

 
CREATE TABLE programs (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    price varchar(20) NOT NULL,
    domain varchar(50) NOT NULL,
    programtype varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    imageurl varchar(255) NOT NULL,
    universityname varchar(100) NOT NULL,
    facultyprofileurl varchar(255) NOT NULL,
    learninghours varchar(10) NOT NULL,
    certificatediploma varchar(50) NOT NULL,
    eligibilitycriteria varchar(20) NOT NULL,
    placementassurance boolean NOT NULL,
    registrations varchar(255) NOT NULL,
    date varchar(255) NOT NULL
);

CREATE TABLE users2 (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    mailid varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    secret varchar(255) NOT NULL
);

