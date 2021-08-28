DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;
CREATE TABLE Department(
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE Role (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL(8, 2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
    SET NULL
);
CREATE TABLE Employee (
    id INT NOT NULL UNIQUE AUTO_INCREMENT,
    first_name VARCHAR(40),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE
    SET NULL
);