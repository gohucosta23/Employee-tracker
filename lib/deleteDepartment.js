const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

function deleteDepartment(){

    connection.query(`SELECT d.department_id AS id, d.department_name AS name FROM department d`,
        function(err, res){

            if(err) throw err;
            // Getting all department names
            const departmentName = res.map(el => el.name);

            inquirer.prompt(
                {
                    type : "rawlist",
                    message : "Choose the department you wish to delete :",
                    name : "department",
                    choices : departmentName
                }
            ).then(function(depRes){
                //Getting the ID for the department to be deleted
                const depId = res.find(el => el.name === depRes.department);
                //Using the ID to delete Department
                connection.query(`DELETE FROM department WHERE ?`,
                {
                    department_id : depId.id
                }, 
                function(err, res){
                    if (err) throw err;
                    console.log("----------------------");
                    console.log("DEPARTMENT DELETED !!!");
                    console.log("----------------------");
                    confirm.confirm();
                })
            })

        })
}
module.exports = {deleteDepartment};