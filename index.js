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
            choices: ['TEST QUERY', 'RUN LIST EMPLOYEES', 'RUN LIST ROLES', 'RUN LIST DEPTS', 'View employees', 'View employees by role', 'View employees by department', 'Add a new employee', 'Add a new role', 'Add a new department', 'Change an employee\'s role', '- Exit Application -']
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
            case 'RUN LIST EMPLOYEES':
                return listEmployees();
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

// // CREATE ROLE ARRAY
var roleArray = [];
function listRoles() {
    var sqlquery = 'SELECT id, title FROM role';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        };
    // console.log(roleArray);
    // console.table(res)
    // console.log(res)
    });
    return roleArray;
};

// CREATE DEPARTMENT ARRAY
var departmentArray = [];
function listDepartments() {
    var sqlquery = 'SELECT id, name FROM department';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
            // deptIdArray.push(res[i].id);
        };
        // console.log(res[2].name)
    // console.log(departmentArray)
    // console.table(res)
    });
    return departmentArray;
};

// CREATE EMPLOYEE ARRAY
var employeeArray = [];
function listEmployees() {
    var sqlquery = 'SELECT CONCAT(employee.first_name, " " ,employee.last_name) AS name FROM employee';
    connection.query(sqlquery, (err, res) => {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            employeeArray.push(res[i].name);
        };
        // console.log(res)
        // console.log(employeeArray)
    });
    return employeeArray;
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
            type: 'list',
            name: 'role',
            message: 'Select role:',
            choices: listRoles()
            // choices: roleArray,
            // choices: ['test1', 'test2'],
        },
        {
            type: 'list',
            name: 'hasManager',
            message: 'Does this employee have a manager?',
            choices: ['Yes', 'No']            
        },
        // if hasManager === yes, ask managerName
        {
            type: 'list',
            name: 'managerName',
            message: 'Select Manager:',
            // choices: ['test1', 'test2'],
            choices: listEmployees(),
            when: (res) => res.hasManager === 'Yes'
        },
    ]).then((res) => {
        console.log(res)
            //FUNCTION TO CREATE ROLE ID
            for (let i = 0; i < roleArray.length; i++) {
                if (res.role === roleArray[i])
                var roleId = i+1;
            }

            if (res.hasManager === 'Yes') {
                //FUNCTION TO CREATE MANAGER ID
                for (let i = 0; i < employeeArray.length; i++) {
                    if (res.managerName === employeeArray[i])
                    var managerId = i+1;
                }
            } else {managerId = null}

            // console.log(res.firstName)
            // console.log(res.lastName)
            // console.log('role:' + res.role)
            // console.log(roleId)
            // console.log('manager' + res.managerName)
            // console.log(managerId)

        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: res.firstName,
                last_name: res.lastName,
                role_id: roleId,
                manager_id: managerId
            },
            (err) => {
                if (err) throw err
                console.log('/////  NEW EMPLOYEE '+res.firstName+' '+res.lastName+' ADDED  /////');
                // console.table(res);
                mainMenu();
            }
        );
    });
};



// ADD NEW ROLE
function addRole() {
    console.log('/////  ADD A NEW ROLE  /////')
    // let departmentArray = listDepartments();
    // var sqlQuery = 'SELECT role.title AS title, role.salary AS salary, department.name AS departmentName, department.id AS departmentId FROM role INNER JOIN department on department.id = role.department_id'
    // connection.query(sqlQuery, (err, res) => {
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
            
            for (let i = 0; i < departmentArray.length; i++) {
                if (res.department === departmentArray[i])
                var departmentId = i+1;
            }

            // console.log(res.title)
            // console.log(res.salary)
            // console.log(res.department)
            // console.log(departmentId)

            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: departmentId
                },
                (err) => {
                    if (err) throw err
                    console.log('/////  NEW ROLE '+res.title+' ADDED  /////');
                    // console.table(res);
                    mainMenu();
                }
            );
        });
    // });
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
                console.log('/////  NEW DEPARTMENT '+res.department+' ADDED  /////');
                // console.table(res);
                mainMenu();
            }
        );
    });
};

// CHANGE EMPLOYEE ROLE
function changeRole() {
    console.log('/////  UPDATE AN EMPLOYEE ROLE /////')
    inquirer.prompt ([
        {
            // Inquirer doesn't like long list as a first prompt, so this is a workaround.
            name: 'hackyFix',
            message: 'Press enter to continue:',
        },
        {
            type: 'list',
            name: 'employee',
            message: 'Select Employee to update:',
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
        
        console.log(res.employee)
        console.log(res.newRole)
        console.log(roleId)
        console.log(employeeId)

    // Update employee with new role_id
        var sqlquery = 'UPDATE employee SET role_id='+roleId+' WHERE id='+employeeId;
        connection.query(sqlquery, (err) => {
            if (err) throw err
            console.log('/////  EMPLOYEE '+res.employee+' ROLE UPDATED TO '+res.newRole+'  /////');
            mainMenu();
        });
    });
};
