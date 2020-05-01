const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

function viewUtilizedBudget() {

    connection.query(`SELECT d.department_id AS id, d.department_name AS name 
    FROM department d`,
    function(err, res){
        if (err) throw err;
        const departmentNames = res.filter(department => department.name);

        inquirer.prompt(
            {
                type : "rawlist",
                name : "department",
                message : "Choose Deartment :",
                choices : departmentNames
            }
        ).then(function(depRes){

            const departmentChosen = res.find(department => department.name === depRes.department);
           
            connection.query(`SELECT SUM(salary) AS Total_Utilized_Budget_from_${departmentChosen.name} FROM employee e LEFT JOIN role r ON
            e.role_id = r.role_id LEFT JOIN department d ON r.department_id = d.department_id 
            WHERE d.department_id = ?`, [departmentChosen.id],
            
            function(err, res){
                if(err) throw err;
                console.table(res);
                confirm.confirm();
            })
        })
    })

}

module.exports = { viewUtilizedBudget };