-- SCHEMA
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- DEPARTMENT TABLE
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30), -- name of department for this employee
);

-- ROLE TABLE
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DEC,
    department_id INT, -- reference to department the role belongs to
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- EMPLOYEE TABLE
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    role_id INT, -- employee role
    manager_id INT, -- reference to this employee's manager, may be NULL
    -- PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;