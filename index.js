require('dotenv').config()
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Declaring connection variables.
const connection = mysql.createConnection({
    user: 'root',
    database: 'employees_db',
    host: 'localhost',
    // Create a .env or replace the value below with your password to use locally.
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
            choices: ['TEST QUERY', 'RUN LIST ROLES', 'RUN LIST DEPTS', 'View employees', 'View employees by role', 'View employees by department', 'Add a new employee', 'Add a new role', 'Add a new department', 'Change an employee\'s role', '- Exit Application -']
        },
    ]).then((answers) => {
        switch (answers.mainMenu) {
            case 'View employees':
                return viewEmployee();
            case 'View employees by role':
                return viewRoles();
            case 'View employees by department':
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
//////////////////////////// TESTING //////////////////////////////////////
            case 'RUN LIST ROLES':
                return listRoles();
            case 'RUN LIST DEPTS':
                return listDepartments();
            case 'TEST QUERY':
                return testQuery();
///////////////////////////// TESTING //////////////////////////////////////
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
function viewRoles() {
    console.log('/////  VIEWING EMPLOYEES BY ROLE  /////')
    var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS Name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id ORDER BY role.title ASC';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// VIEW ALL EMPLOYEES BY DEPARTMENT
function viewDepartments() {
    console.log('/////  VIEWING EMPLOYEES BY DEPARTMENT  /////')
    var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS Name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.name ASC';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// CREATE ROLE ARRAY
function listRoles() {
    let roleArray = [];
    // var sqlquery = 'SELECT id, title FROM role ORDER BY TITLE ASC';
    var sqlquery = 'SELECT name FROM role';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        };
    console.table(res)
    });
    console.log(roleArray);
    return roleArray;
};

// CREATE DEPARTMENT ARRAY
function listDepartments() {
    let departmentArray = [];
    connection.query('SELECT id, name FROM department', (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].title);
        };
    console.table(res)
    });
    console.log(departmentArray)
    return departmentArray;
};


///////////////////////////////////////////
// WORK BELOW HERE:

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
            type: 'choice',
            name: 'role',
            message: 'Select role:',
            // choices: listRoles(),
            choices: ['test1', 'test2'],
        },
        {
            type: 'choice',
            name: 'hasManager',
            message: 'Does this employee have a manager?',
            choices: ['Yes', 'No']            
        },
        // if hasManager === yes, ask managerName
        {
            type: 'list',
            name: 'managerName',
            message: 'Select Manager:',
            choices: ['TEST'],
            when: (answers) => answers.hasManager === 'Yes'
        },
    ]).then((res) => {
        console.log(res)
    });
};


////////////// TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY ///////////////////////////
function testQuery() {
    // var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS Name, employee.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(e.first_name, " " ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id ORDER BY employee.first_name ASC';
    // var sqlquery = 'SELECT role.title AS title, role.salary AS salary, department.name AS departmentName, department.id AS departmentId FROM role INNER JOIN department on department.id = role.department_id';
    var sqlQuery = 'SELECT '
    
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    });
};
////////////// TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY TEST QUERY ///////////////////////////


// ADD NEW ROLE
function addRole() {
    console.log('/////  ADD A NEW ROLE  /////')
    // let departmentArray = listDepartments();
    var sqlQuery = 'SELECT role.title AS title, role.salary AS salary, department.name AS departmentName, department.id AS departmentId FROM role INNER JOIN department on department.id = role.department_id'
    connection.query(sqlQuery, (err, res) => {
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
                name: 'departmentId',
                message: 'Enter department for this role:',
                // return array from listDeparments function as choices
                // choices: departmentArray,
                choices: listDepartments(),
            },
        ]).then((res) => {
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.departmentId
                },
                (err) => {
                    if (err) throw err
                    // console.table(res);
                    mainMenu();
                }
            );
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
        connection.query(
            'INSERT INTO department SET ?',
            {
                
                name: res.department,
            },
            (err) => {
                if (err) throw err
                // console.table(res);
                mainMenu();
            }
        );
    });
};

// CHANGE EMPLOYEE ROLE
function changeRole() {
    console.log('/////  CHANGE AN EMPLOYEE\'S ROLE  /////')

};

// Run application
// mainMenu()