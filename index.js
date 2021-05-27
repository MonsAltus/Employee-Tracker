const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
require('dotenv')

const connection = mysql.createConnection({
    user: 'root',
    database: 'employees_db',
    host: 'localhost',
    password: process.env.DB_PASS,
    port: 3306,
});

connection.connect()

function mainMenu() {
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
    console.log('Goodbye')
    process.exit()
}

function viewEmployee() {

};

function viewRoles() {

};

function viewDepartments() {
    var sqlquery = 'SELECT * FROM department';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err;
        console.table(res)
        connnection.end()
    }) 
};


function addEmployee() {
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
            type: 'input',
            name: 'role',
            message: 'Enter role:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter department:',
        },

        //Choose salary
        //Choose manager
    ]);
};

function addRole() {

};

function addDepartment() {

};

function changeRole() {

};




// Run application
mainMenu()