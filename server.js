require("console.table");
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
  name: "Action",
  message: "What action would you like to take?",
  choices: [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee role",
  ],
};

connection.connect((err) => {
  if (err) throw err;
  console.log("connection successful");
  actionQuestion(question);
});
