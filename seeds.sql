USE employees_db;

-- DEPARTMENT SEEDS
INSERT INTO department (id, name)
VALUES (1, 'Software Development');

INSERT INTO department (id, name)
VALUES (2, 'Marketing');

INSERT INTO department (id, name)
VALUES (3, 'Human Resources');

INSERT INTO department (id, name)
VALUES (4, 'Legal');

INSERT INTO department (id, name)
VALUES (5, 'Finance');

-- ROLE SEEDS
INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Front end Developer', 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'Back end Developer', 100000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, 'Project Manager', 130000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, 'Marketing Analyst', 80000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, 'Recruiter', 75000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, 'Staff Coordinator', 60000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, 'Lawyer', 110000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, 'Accountant', 55000, 5);

-- EMPLOYEE SEEDS
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Remy', 'Martin', 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Vera', 'Dillard', 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, 'Annika', 'Ramirez', 2, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, 'Jermaine', 'Dotson', 2, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, 'Tyla', 'Talbot', 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, 'Amit', 'Lancaster', 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, 'Avery', 'Michael', 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, 'Hector', 'Moyer', 5, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, 'Douglas', 'Byrne', 5, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Kaitlan', 'Haines', 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, 'Andy', 'Rivera', 7, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (12, 'Skylar', 'Rasmussen', 7, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (13, 'Cairon', 'Chung', 8, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (14, 'Derry', 'Stout', 8, null);
