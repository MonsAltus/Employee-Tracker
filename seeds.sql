USE employeedb;

-- DEPARTMENT SEEDS
INSERT into department (name) VALUES ('Software Development');
INSERT into department (name) VALUES ('Marketing');
INSERT into department (name) VALUES ('Human Resources');
INSERT into department (name) VALUES ('Legal');
INSERT into department (name) VALUES ('Finance');

-- ROLE SEEDS
INSERT into role (title, salary, department_id) VALUES ('Front end Developer', 100000, 1);
INSERT into role (title, salary, department_id) VALUES ('Back end Developer', 100000, 1);
INSERT into role (title, salary, department_id) VALUES ('Project Manager', 130000, 1);
INSERT into role (title, salary, department_id) VALUES ('Marketing Analyst', 80000, 2);
INSERT into role (title, salary, department_id) VALUES ('Recruiter', 75000, 3);
INSERT into role (title, salary, department_id) VALUES ('Staff Coordinator', 60000, 3);
INSERT into role (title, salary, department_id) VALUES ('Lawyer', 110000, 4);
INSERT into role (title, salary, department_id) VALUES ('Accountant', 55000, 5);

-- EMPLOYEE SEEDS
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Remy', 'Martin', 1, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Vera', 'Dillard', 1, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Annika', 'Ramirez', 2, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Jermaine', 'Dotson', 2, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Tyla', 'Talbot', 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Amit', 'Lancaster', 4, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Avery', 'Michael', 4, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Hector', 'Moyer', 5, 10);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Douglas', 'Byrne', 5, 10);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Kaitlan', 'Haines', 6, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Andy', 'Rivera', 7, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Skylar', 'Rasmussen', 7, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Cairon', 'Chung', 8, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Derry', 'Stout', 8, null);