const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

function viewByManager(){

    // Selecting all the info I will need and fitering to show only managers
    connection.query(`SELECT DISTINCT m.manager_id AS ID, CONCAT(e.firstName, " ", e.lastName) AS employee
    FROM employee e INNER JOIN employee m ON
    m.manager_id = e.id`,
    function(err, res){

        
        const managers = res.map(el => el.employee);
        

        inquirer.prompt(
            {
                type : "rawlist",
                message : "Choose a manager :",
                name : "manager",
                choices : managers
            }
        ).then(function(managerRes){

            const managersID = res.find(el => el.employee === managerRes.manager);
            // Now displaying employees that have a manager using the chosen manager id from above
            connection.query(`SELECT e.id AS ID, CONCAT(e.firstName, " ", e.lastName) AS Employee
            FROM employee  e WHERE ?`,
            {
                manager_id : managersID.ID
            },
            function(err, res){
                if(err) throw err;
                console.table(res);
                confirm.confirm();
            })
        })

    });
}

module.exports = {viewByManager};