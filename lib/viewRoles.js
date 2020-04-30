const mysql = require("mysql");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);
const confirm = require("./confirm");


function viewRoles(){

    //Selecting all roles and role ids and displaying on a table
    connection.query(`SELECT role_id as ID, title as Title, salary as Salary FROM role`,
    function(err, res){
        if(err) throw err;
        console.table(res);
        confirm.confirm();

    });
}
module.exports = {viewRoles};