const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);


function updateEmployeeRole(){
    
    connection.query("SELECT role.title FROM role", function(err, res){
        // List of all titles
        const titleArr = res.map(element => element.title);
        
        connection.query(`SELECT employee.id AS e_id, CONCAT(employee.firstName, " ", employee.lastName) AS employee,
        role.title AS title, role.role_id AS ID FROM employee INNER JOIN role ON
        employee.role_id = role.role_id`, function(err, res){
            if(err) throw err;
            //List of all employees
            const employees = res.map(el => el.employee);
            
            inquirer.prompt([
                {
                    type : "rawlist",
                    message : "Choose employee :",
                    name : "employee",
                    choices : employees
                },
                {
                    type : "rawlist",
                    message : "Choose new title for employee :",
                    name : "title",
                    choices : titleArr   
                }
            ]).then(function(updateRes){
                // Getting the role id based on role title
                const titleAndID = res.find(el => el.title === updateRes.title);
                //Getting the employee id to point which row in the database to be updated
                const employeeId = res.find(el => el.employee === updateRes.employee);
                  
                connection.query("UPDATE employee SET ? WHERE ?",
                [
                {
                    role_id : titleAndID.ID
                }, 
                {
                    id : employeeId.e_id
                }
                ],function(err, res){
                    if(err) throw err;
                    console.log("-------------------------");
                    console.log("EMPLOYEE ROLE UPDATED !!!");
                    console.log("-------------------------");
                    confirm.confirm();
                })
            
            });

        });
    });
}
module.exports = {updateEmployeeRole};