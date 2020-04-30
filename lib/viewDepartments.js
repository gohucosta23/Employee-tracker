const mysql = require("mysql");
const databaseConnection = require("./databaseConnection");
const confirm = require("./confirm");
const connection = mysql.createConnection(databaseConnection);


function viewDepartments(){
    
    //Selecting all departments and departments ids and display on table
    connection.query(`SELECT department_id as ID, department_name as DEPARTMENT FROM department`,

    function(err, res){

        if(err) throw err;
        console.table(res);
        confirm.confirm();
    });
}
module.exports = {viewDepartments};