const cTable = require("console.table");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  //Enter port if different from 3306
  port: 3306,
  //Enter username if different from root
  user: "root",
  //Enter your password here
  password: "12345678",
  database: "employee_db",
});

const question = {
  type: "list",
  name: "action",
  message: "What action would you like to take?",
  choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
    "Exit",
  ],
};

connection.connect((err) => {
  if (err) throw err;
  console.log("connection successful");
  startPrompt();
});

async function startPrompt() {
  const { action } = await inquirer.prompt(question);
  switch (action) {
    case "View all departments":
      viewAllDepartments();
      break;

    case "View all roles":
      viewAllRoles();
      break;

    case "View all employees":
      viewEmployees();
      break;

    case "Add a department":
      viewEmployees();
      break;

    case "Add a role":
      viewEmployees();
      break;

    case "Add an employee":
      viewEmployees();
      break;

    case "Update an employee role":
      viewEmployees();
      break;
  }
}

function showDepartments() {
  return connection
    .promise()
    .query("SELECT id, dept_name AS Departments FROM department ORDER BY id")
    .then(([data]) => {
      console.table(data);
    })
    .catch();
}

async function viewAllDepartments() {
  await showDepartments();
  startPrompt();
}

function showRoles() {
  return connection
    .promise()
    .query(
      "SELECT id AS 'Role ID', title AS 'Job Title', salary AS Salary FROM role ORDER BY id"
    )
    .then(([roleData]) => {
      console.table(roleData);
    })
    .catch();
}

async function viewAllRoles() {
  console.log("Viewing All Roles");
  await showRoles();
  startPrompt();
}

showEmployees () {}



viewAllEmployees() {}