const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const databaseConnection = require("./lib/databaseConnection");
const start = require("./index");


const addEmployee = require("./lib/addemployee");
const viewDepartments = require("./lib/viewDepartments");
const viewRoles = require("./lib/viewRoles");
const viewEmployees = require("./lib/viewEmployees");
const addDepartment = require("./lib/addDepartment");
const updateEmployeeRole = require("./lib/updateEmployeeRole");
const viewByManager = require("./lib/viewByManager");
const addRoles = require("./lib/addRoles");
const deleteEmployee = require("./lib/deleteEmployee");
const deleteRole = require("./lib/deleteRole");
const deleteDepartment = require("./lib/deleteDepartment");


const connection = mysql.createConnection(databaseConnection);

connection.connect(function(err){
    if(err) throw err;
    start.start();
});



exports.start = function(){

    //List of all options
    const optionsArr = ["View Departments", "View Roles", "View Employees", "Add Departments", 
    "Add Roles", "Add Employees", "Update employee's role", "View employees by manager","Delete departments", 
    "Delete roles", "Delete employee", "EXIT"];
    
    inquirer.prompt(
        {
            type : "rawlist",
            message : "Choose an option below : ",
            name : "initialOptions",
            choices : optionsArr

    }).then(function(optionsRes){
        switch(optionsRes.initialOptions){

            case "View Departments":
                viewDepartments.viewDepartments();
                break;
            case "View Roles":
                viewRoles.viewRoles();
                break;
            case "View Employees":
                viewEmployees.viewEmployees();
                break;
            case "Add Departments":
                addDepartment.addDepartment();
                break;
            case "Add Roles":
                addRoles.addRoles();
                break;
            case "Add Employees":
                addEmployee.addEmployee();
                break;
            case "Update employee's role":
                updateEmployeeRole.updateEmployeeRole();
                break;
            case "View employees by manager":
                viewByManager.viewByManager();
                break;
            case "Delete departments":
                deleteDepartment.deleteDepartment();
                break;
            case "Delete roles":
                deleteRole.deleteRole();
                break;
            case "Delete employee":
                deleteEmployee.deleteEmployee();
                break;
            case "EXIT":
                connection.end();
                break;
    }
    })
}
module.exports = {start};




