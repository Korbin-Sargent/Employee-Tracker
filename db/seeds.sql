USE employee_db;

INSERT INTO department(dept_name) VALUES ("Executives");
INSERT INTO department(dept_name) VALUES ("Directors");
INSERT INTO department(dept_name) VALUES ("Manager");
INSERT INTO department(dept_name) VALUES ("Employee");
INSERT INTO department(dept_name) VALUES ("Intern");


INSERT INTO roles (title, salary, department_id) VALUES (CEO, 350000, 1 );
INSERT INTO roles (title, salary, department_id) VALUES (CTO, 300000, 1 );
INSERT INTO roles (title, salary, department_id) VALUES (CRO, 250000, 1 );
INSERT INTO roles (title, salary, department_id) VALUES (Director of Engineering, 145000, 2 );
INSERT INTO roles (title, salary, department_id) VALUES (Director of Product, 120000, 2 );
INSERT INTO roles (title, salary, department_id) VALUES (Director of Sales, 100000, 2 );
INSERT INTO roles (title, salary, department_id) VALUES (Engineering Manager, 100000, 3 );
INSERT INTO roles (title, salary, department_id) VALUES (Product Manager, 100000, 3 );
INSERT INTO roles (title, salary, department_id) VALUES (Sales Manager, 70000, 3 );
INSERT INTO roles (title, salary, department_id) VALUES (Sales Representative, 45000, 4 );
INSERT INTO roles (title, salary, department_id) VALUES (Junior Developer, 80000, 4 );
INSERT INTO roles (title, salary, department_id) VALUES (Product Intern, 15000, 5 );
INSERT INTO roles (title, salary, department_id) VALUES (Engineering Intern, 45000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Joe, Montana, 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Tom, Brady, 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Peyton, Manning, 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Brett, Favre, 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Dan, Marino, 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Drew, Brees, 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (John, Elway, 7, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Roger, Staubach, 8, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Johnny, Unitas, 9, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Aaron, Rodgers, 10, 9);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Russell, Wilson, 11, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Steve, Young, 12, 8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (Terry, Bradshaw, 13, 7);