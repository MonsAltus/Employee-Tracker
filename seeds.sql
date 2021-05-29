USE employees_db;

-- DEPARTMENT SEEDS
INSERT INTO department (name) VALUES ('Software Development');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Finance');

-- ROLE SEEDS
INSERT INTO role (title, salary, department_id) VALUES ('Front end Developer', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Back end Developer', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Project Manager', 130000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Analyst', 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Recruiter', 75000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Staff Coordinator', 60000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 110000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 55000, 5);

-- EMPLOYEE SEEDS
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Remy', 'Martin', 1, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Vera', 'Dillard', 1, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Annika', 'Ramirez', 2, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jermaine', 'Dotson', 2, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tyla', 'Talbot', 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Amit', 'Lancaster', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Avery', 'Michael', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Hector', 'Moyer', 5, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Douglas', 'Byrne', 5, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Kaitlan', 'Haines', 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Andy', 'Rivera', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Skylar', 'Rasmussen', 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Cairon', 'Chung', 8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Derry', 'Stout', 8, null);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;