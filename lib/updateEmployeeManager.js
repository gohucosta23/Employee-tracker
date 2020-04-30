const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

function updateEmployeeManager(){

    connection.query(`SELECT e.id AS id, CONCAT(e.firstName, " ", e.lastName) AS employee 
    FROM employee e`,
    function(err, res) {
        if(err) throw err;
        
        const employeeChoices = res.map(el => el.employee);

        inquirer.prompt(
            {
                type : "rawlist",
                message : "Select the employee to update the manager :",
                name : "employee",
                choices : employeeChoices
            }
        ).then(function(empRes){
          
            const employeeId = res.find(el => el.employee === empRes.employee);
            

            const managerOptions = [];
            for (var i = 0; i < res.length; i++){
                if(res[i].employee !== empRes.employee){
                    managerOptions.push(res[i]. employee);
                }
            } 
          
            // const managerOptions = res.find(el => el.employee !== empRes.employee);
            
           
            inquirer.prompt(
                {
                    type : "rawlist",
                    message : "Choose the new Manager :",
                    name : "manager",
                    choices : managerOptions
                }
            ).then(function(manRes){

                const newManagerId = res.find(el => el.employee === manRes.manager);
                
                connection.query(`UPDATE employee SET ? WHERE ?`,
                [
                {
                    manager_id : newManagerId.id
                },
                {
                    id : employeeId.id
                }
                ],
                function(err, res){

                    if(err) throw err;

                    console.log("------------------------------");
                    console.log("EMPLOYEE'S MANAGER UPDATED !!!");
                    console.log("------------------------------");
                    confirm.confirm();
                });

            });
           
        });

    });
}


module.exports = {updateEmployeeManager};