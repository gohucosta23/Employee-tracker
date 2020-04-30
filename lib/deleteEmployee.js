const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

function deleteEmployee(){

    //Getting the ID and first and last name of all eployees
    connection.query(`SELECT e.id AS id, CONCAT(e.firstName, " ", e.lastName) AS employee 
        FROM employee e`, 
        function(err, res){

            if(err) throw err;
            console.log(res);
            const employees = res.map(el => el.employee);
            inquirer.prompt(
                {
                    type : "rawlist",
                    message : "Choose the employee to be deleted :",
                    name : "employee",
                    choices : employees
                }
            ).then(function(employeeRes){
                
                //Finding the ID of the employee to be deleted
                const employeeId = res.find(el => el.employee === employeeRes.employee);
                
                connection.query(`DELETE FROM employee WHERE ?`,
                {
                    id : employeeId.id
                }, 
                function(err, res){

                    if(err) throw err;
                    console.log("--------------------");
                    console.log("EMPLOYEE DELETED !!!");
                    console.log("--------------------");
                    confirm.confirm();
                })
            })
            
        })
}
module.exports = {deleteEmployee};