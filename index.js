require('dotenv').config()
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Declaring connection variables.
const connection = mysql.createConnection({
    user: 'root',
    database: 'employees_db',
    host: 'localhost',
    // Create a .env with password or replace the value below with your password to use locally.
    password: process.env.DB_PASS,
    port: 3306,
});

// Create connection with MySQL localhost and run Main Menu if no error.
connection.connect((err) => {
    if (err) throw err;
    mainMenu();
})

// MAIN MENU
function mainMenu() {
    console.log('/////  MAIN MENU  /////')
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Choose an option:',
            choices: ['View employees', 'View employees by role', 'View employees by department', 'View Roles', 'View Departments', 'Add a new employee', 'Add a new role', 'Add a new department', 'Change an employee\'s role', '- Exit Application -']
        },
    ]).then((answers) => {
        // Handle user selection with switch function.
        switch (answers.mainMenu) {
            case 'View employees':
                return viewEmployee();
            case 'View employees by role':
                return viewEmplByRole();
            case 'View employees by department':
                return viewEmplByDepartment();
            case 'View Roles':
                return viewRoles();
            case 'View Departments':
                return viewDepartments();
            case 'Add a new employee':
                return addEmployee();
            case 'Add a new role':
                return addRole();
            case 'Add a new department':
                return addDepartment();
            case 'Change an employee\'s role':
                return changeRole();
            case '- Exit Application -':
                return exit();
            default:
                return exit();
        } 
    })
};

// EXIT APP
function exit() {
    console.log('Exiting Application. Goodbye.')
    process.exit()
}

// VIEW ALL EMPLOYEES
function viewEmployee() {
    console.log('/////  VIEWING ALL EMPLOYEES ALPHABETICALLY  /////')
    var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS Name, employee.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(e.first_name, " " ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id ORDER BY employee.first_name ASC';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// VIEW ALL EMPLOYEES BY ROLE
function viewEmplByRole() {
    console.log('/////  VIEWING EMPLOYEES BY ROLE  /////')
    var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS Name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id ORDER BY role.title ASC';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// VIEW ALL EMPLOYEES BY DEPARTMENT
function viewEmplByDepartment() {
    console.log('/////  VIEWING EMPLOYEES BY DEPARTMENT  /////')
    var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS Name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.name ASC';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// VIEW ALL ROLES
function viewRoles() {
    console.log('/////  VIEWING ALL ROLES  /////')
    var sqlquery = 'SELECT id, title FROM role ORDER BY id ASC';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// VIEW ALL DEPARTMENTS
function viewDepartments() {
    console.log('/////  VIEWING ALL DEPARTMENTS  /////')
    var sqlquery = 'SELECT id, name FROM department ORDER BY id ASC';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// CREATE ROLE ARRAY
// Returns array from the title column on role table.
var roleArray = [];
function listRoles() {
    var sqlquery = 'SELECT id, title FROM role';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        };
    // console.log(roleArray);
    });
    return roleArray;
};

// CREATE DEPARTMENT ARRAY
// Returns array from the name column on department table.
var departmentArray = [];
function listDepartments() {
    var sqlquery = 'SELECT id, name FROM department';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        };
    // console.log(departmentArray)
    });
    return departmentArray;
};

// CREATE EMPLOYEE ARRAY
// Returns array of full names from the employee table.
var employeeArray = [];
function listEmployees() {
    var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS name FROM employee';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            employeeArray.push(res[i].name);
        };
    });
    return employeeArray;
};

// ADD NEW EMPLOYEE
function addEmployee() {
    console.log('/////  ADD A NEW EMPLOYEE  /////');
    inquirer.prompt ([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter first name:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter last name:',
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select role:',
            // return array from listRoles function as choices
            choices: listRoles()
        },
        {
            type: 'list',
            name: 'hasManager',
            message: 'Does this employee have a manager?',
            choices: ['Yes', 'No']            
        },
        {
            // if hasManager === yes, ask managerName
            type: 'list',
            name: 'managerName',
            message: 'Select Manager:',
            choices: listEmployees(),
            when: (res) => res.hasManager === 'Yes'
        },
    ]).then((res) => {
        // console.log(res)
            //Find role_id
            for (let i = 0; i < roleArray.length; i++) {
                if (res.role === roleArray[i])
                var roleId = i+1;
            }
            //If new employee has a manager, find manager_id
            if (res.hasManager === 'Yes') {
                for (let i = 0; i < employeeArray.length; i++) {
                    if (res.managerName === employeeArray[i])
                    var managerId = i+1;
                }
            } else {managerId = null}
        // Adds new data to employee table.
        connection.query('INSERT INTO employee SET ?',
            {
                first_name: res.firstName,
                last_name: res.lastName,
                role_id: roleId,
                manager_id: managerId
            },
            (err) => {
                if (err) throw err
                console.log('/////  NEW EMPLOYEE '+res.firstName+' '+res.lastName+' ADDED  /////');
                mainMenu();
            }
        );
    });
};

// ADD NEW ROLE
function addRole() {
console.log('/////  ADD A NEW ROLE  /////')
    inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'Enter new role name:',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter salary for this role:',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Enter department for this role:',
            // return array from listDeparments function as choices
            choices: listDepartments(),
        },
    ]).then((res) => {
        // Find department_id
        for (let i = 0; i < departmentArray.length; i++) {
        if (res.department === departmentArray[i])
        var departmentId = i+1;
    }
    // Add new data to role table.
    connection.query('INSERT INTO role SET ?',
        {
            title: res.title,
            salary: res.salary,
            department_id: departmentId
        },
        (err) => {
            if (err) throw err
            console.log('/////  NEW ROLE '+res.title+' ADDED  /////');
            mainMenu();
        });
    });
};

// ADD NEW DEPARTMENT
function addDepartment() {
    console.log('/////  ADD A NEW DEPARTMENT  /////')
    inquirer.prompt ([
        {
            type: 'input',
            name: 'department',
            message: 'Enter new department name:',
        },
    ]).then((res) => {
        // Add new data to department table.
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: res.department,
            },
            (err) => {
                if (err) throw err
                console.log('/////  NEW DEPARTMENT '+res.department+' ADDED  /////');
                mainMenu();
            }
        );
    });
};

// CHANGE EMPLOYEE ROLE
function changeRole() {
    console.log('/////  UPDATE AN EMPLOYEE\'S ROLE /////')
    inquirer.prompt ([
        {
            // Inquirer doesn't like a long list as a first prompt, so this is a workaround.
            name: 'hackyFix',
            message: 'Press enter to continue:',
        },
        {
            type: 'list',
            name: 'employee',
            message: 'Select Employee to update:',
            // return array from listEmployees function as choices
            choices: listEmployees(),
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Select new role:',
            choices: listRoles(),
        },
    ]).then((res) => {
        // Find role_id
        for (let i = 0; i < roleArray.length; i++) {
            if (res.newRole === roleArray[i])
            var roleId = i+1;
        }
        // Find employee id
        for (let i = 0; i < employeeArray.length; i++) {
            if (res.employee === employeeArray[i])
            var employeeId = i+1;
        }
        // Update employee with new role_id
        var sqlquery = 'UPDATE employee SET role_id='+roleId+' WHERE id='+employeeId;
        connection.query(sqlquery, (err) => {
            if (err) throw err
            console.log('/////  EMPLOYEE '+res.employee+' ROLE UPDATED TO '+res.newRole+'  /////');
            mainMenu();
        });
    });
};
