require('dotenv').config()
const mysql = require('mysql');
const inquirer = require('inquirer');
// const consoleTable = require('console.table');


const connection = mysql.createConnection({
    user: 'root',
    database: 'employees_db',
    host: 'localhost',
    // Create a .env or replace the value below with your password to use locally.
    password: process.env.DB_PASS,
    port: 3306,
});

// Create connection with MySQL localhost
connection.connect((err) => {
    if (err) throw err;
    mainMenu();
})


function mainMenu() {
    console.log('/////EMPLOYEE TRACKER/////')
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Choose an option:',
            choices: ['View employees', 'View employees by role', 'View employees by department', 'Add an employee', 'Add a role', 'Add a department', 'Change an employee\'s role']
        },
    ]).then((answers) => {
        switch (answers.mainMenu) {
            case 'View employees':
                return viewEmployee();
            case 'View employees by role':
                return viewRoles();
            case 'View employees by department':
                return viewDepartments();
            case 'Add an employee':
                return addEmployee();
            case 'Add a role':
                return addRole();
            case 'Add a department':
                return addDepartment();
            case 'Change an employee\'s role':
                return changeRole();
            default:
                return exit();
        } 
    })
};

function exit() {
    console.log('Exiting Application. Goodbye.')
    process.exit()
}

// VIEW ALL EMPLOYEES
function viewEmployee() {
    console.log('/////VIEW EMPLOYEES/////')
    var sqlquery = 'SELECT * FROM employee';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// VIEW ALL ROLES
function viewRoles() {
    console.log('/////VIEW ROLES/////')
    var sqlquery = 'SELECT * FROM role';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};

// VIEW ALL DEPARTMENTS
function viewDepartments() {
    console.log('/////VIEW DEPARTMENTS/////')
    var sqlquery = 'SELECT name FROM department';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        mainMenu();
    }) 
};


///////////////////////////////////////////
// WORK BELOW HERE:


// ADD NEW EMPLOYEE
function addEmployee() {
    console.log('/////ADD EMPLOYEE/////');
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
            choices: listRoles(),
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
            choices: '',
        },
    ]).then()
};

// CREATE ROLE ARRAY
function listRoles() {
    var roleArray = [];
    connection.query('SELECT id, title FROM role ORDER BY TITLE ASC', (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        };
    });
    return roleArray;
};

// CREATE DEPARTMENT ARRAY
function listDepartments() {
    let departmentArray = [];
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].title);
        };
    });
    return departmentArray;
};

// ADD NEW ROLE
function addRole() {
    console.log('/////ADD ROLE/////')
    let departmentArray = listDepartments();
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", (err, res) => {
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
                choices: departmentArray,
            },
        ]).then();
    });
};

// ADD NEW DEPARTMENT
function addDepartment() {
    console.log('/////ADD DEPARTMENT/////')
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
                console.table(res);
                mainMenu();
            }
        );
    });
};

// CHANGE EMPLOYEE ROLE
function changeRole() {
    console.log('/////CHANGE EMPLOYEE ROLE/////')

};

// Run application
// mainMenu()