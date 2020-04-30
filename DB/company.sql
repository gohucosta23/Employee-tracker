DROP DATABASE IF EXISTS Company_DB;

CREATE DATABASE Company_DB;

USE Company_DB;

CREATE TABLE employee (

    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    role_id INT FOREIGN KEY (role_id) REFERENCES role(role_id)
    manager_id INT FOREIGN KEY (manager_id) REFERENCES employee(id)
    PRIMARY KEY(id)
);

CREATE TABLE department(
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);

CREATE TABLE role(

    role_id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(30) NOT NULL,
    PRIMARY KEY(role_id),
    department_id INT FOREIGN KEY(department_id) REFERENCES department(department_id)
);

INSERT INTO employee(firstName, lastName, role_id,manager_id)
VALUES ("John", "Smith", 1, 3), ("William", "Bosh", 2, 2), ("Steve", "Segal", 5, NULL), ("Bob", "Williams", 3, 2),("Galal", "daCosta", 4, NULL),
("Frederico", "Amaral", 4, 3); 

INSERT INTO department(department_name)
VALUES("Finance"), ("Legal"), ("Sales"), ("TECH") ,("Customer Service");

INSERT INTO role(title, salary)
VALUES("Software Enginner", 80000), ("Sales Manager", 100000), ("Sales Person", 60000), ("Lead Engineer", 120000), ("Accountant", 100000);