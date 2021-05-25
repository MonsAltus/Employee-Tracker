-- Scheema
-- DROP DATABASE IF EXISTS employees_db
CREATE DATABASE employees_db
USE employees_db

CREATE TABLE employee (
    id INT NOT NULL
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    role_id INT, -- employee role
    manager_id INT, -- reference to this employee's manager, may be NULL
    PRIMARY KEY(id)
)

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) -- name of department for this employee
    PRIMARY KEY (id)
)

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DEC,
    department_id INT, -- reference to department the role belongs to
    PRIMARY KEY (id)
)