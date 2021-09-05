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

const actionQuestions = [
  "View all departments",
  "View all roles",
  "View all employees",
  "Add a department",
  "Add a role",
  "Add an employee",
  "Update an employee role",
  "Exit",
];

const question = {
  type: "list",
  name: "action",
  message: "What action would you like to take?",
  choices: actionQuestions,
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
      viewAllEmployees();
      break;

    case "Add a department":
      viewEmployees();
      break;

    case "Add a role":
      addRole();
      break;

    case "Add an employee":
      addEmployee();
      break;

    case "Update an employee role":
      viewEmployees();
      break;
  }
}

function getAllDepartments() {
  return connection
    .promise()
    .query("SELECT id, name AS Departments FROM department ORDER BY id");
}

function getAllEmployees() {
  return connection.promise().query(
    `
      SELECT 
        employee.id AS 'Employee ID', 
        employee.first_name AS 'First Name',
        employee.last_name AS 'Last Name',  
        role.title AS 'Job Title',
        role.salary AS Salary, 
        department.name AS Department,
      CONCAT(manager.first_name,' ', manager.last_name) AS Manager  
      FROM employee
      JOIN role ON role.id = employee.role_id 
      JOIN department ON department.id = role.department_id
      LEFT JOIN employee manager
      ON manager.id = employee.manager_id
      ORDER BY employee.id`
  );
}

function getAllRoles() {
  return connection.promise().query(
    `
      SELECT 
        role.id AS 'Role ID', 
        role.title AS 'Job Title', 
        role.salary AS Salary, 
        department.name AS Department 
      FROM role
      JOIN department ON department.id = role.department_id 
      ORDER BY role.id`
  );
}

function getRoles() {
  return connection.promise().query(`SELECT id, title FROM role`);
}

function getEmployees() {
  return connection.promise().query(
    `
      SELECT
        id,
        first_name,
        last_name  
      FROM employee`
  );
}

function getDepartments() {
  return connection.promise().query(`SELECT id, name FROM department`);
}

async function viewAllDepartments() {
  const [departments] = await getAllDepartments();
  console.table(departments);
  startPrompt();
}

async function viewAllEmployees() {
  const [employees] = await getAllEmployees();
  console.table(employees);
  startPrompt();
}

async function viewAllRoles() {
  console.log("Viewing All Roles");
  const [roles] = await getAllRoles();
  console.table(roles);
  startPrompt();
}

function addRoleToDb(role, salary, departmentId) {
  return connection.promise().query("INSERT INTO role SET ?", {
    title: role,
    salary: salary,
    department_id: departmentId,
  });
}

function addEmployeesToDb(first_name, last_name, role_id, manager_id) {
  return connection.promise().query("INSERT INTO employee SET ?", {
    first_name: first_name,
    last_name: last_name,
    role_id: role_id,
    manager_id: manager_id,
  });
}

async function addEmployee() {
  //prompt first name, lastname, role(from list of roles), managerid(list out managers)
  const [roles] = await getRoles();
  console.log(roles);
  const roleList = roles.map((role) => {
    return role.title;
  });
  const [managers] = await getEmployees();
  console.log(managers);
  const managersList = managers.map((manager) => {
    return manager.first_name + " " + manager.last_name;
  });

  managersList.unshift("Null");

  const newEmployee = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roleList,
    },
    {
      name: "manager",
      type: "list",
      message: "Who is the employee's manager?",
      choices: managersList,
    },
  ]);

  let managerId;
  if (newEmployee.manager !== "None") {
    const managerData = managers.find(
      (userInput) =>
        newEmployee.manager === userInput.first_name + " " + userInput.last_name
    );
    console.log(managerData);
    managerId = managerData.id;
    console.log(managerId);
  }

  const roleData = roles.find(
    (userInput) => newEmployee.role === userInput.title
  );
  console.log(roleData);
  let roleId = roleData.id;

  await addEmployeesToDb(
    newEmployee.firstName,
    newEmployee.lastName,
    roleId,
    managerId
  );

  console.log(`Added ${newEmployee.firstName} to the database.`);
  // return connection.query(`INSERT INTO employee SET ?`, {first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id})
  startPrompt();
}

async function addRole() {
  const [departments] = await getDepartments();
  console.log(departments);
  const departmentsList = departments.map((department) => {
    return department.name;
  });
  const newRole = await inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "What role would you like to add?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role?",
    },
    {
      name: "department",
      type: "list",
      message: "What department does this role belong to?",
      choices: departmentsList,
    },
  ]);

  const departmentData = departments.find(
    (userInput) => (newRole.role = userInput.name)
  );
  let departmentId = departmentData.id;

  await addRoleToDb(newRole.role, newRole.salary, departmentId);
  console.log(`added ${newRole.role} to the database.`);
  startPrompt();
}
