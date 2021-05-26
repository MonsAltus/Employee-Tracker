-- Scheema
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

-- EMPLOYEE TABLE
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    role_id INT, -- employee role
    manager_id INT, -- reference to this employee's manager, may be NULL
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES manager(id)
);

-- DEPARTMENT TABLE
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30), -- name of department for this employee
    PRIMARY KEY (id)
);

-- ROLE TABLE
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DEC,
    department_id INT, -- reference to department the role belongs to
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;