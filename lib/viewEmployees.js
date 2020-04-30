const mysql = require("mysql");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);
const confirm = require("./confirm");

function viewEmployees(){

    //Selecting all employees and their info and displaying on table
    // Using LEFT JOIN so even if they don't have a manager or if an other info is missing they would display
    connection.query(`SELECT e.id AS ID, e.firstName AS First_Name, e.lastName AS Last_Name, r.title AS Title, r.salary AS Salary, 
    CONCAT(m.firstName, " " ,m.lastName) AS Manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.role_id 
    LEFT JOIN department AS d ON r.department_id = d.department_id LEFT JOIN employee AS m
    ON m.id = e.manager_id`, 
        function(err, res){
            if(err) throw err;
            console.table(res);
            confirm.confirm();
        })
}
module.exports = {viewEmployees};