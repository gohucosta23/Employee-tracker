const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

function deleteRole(){

    // Getting id and title of all roles
    connection.query(`SELECT r.role_id as id, r.title as title FROM role r`,
        function(err, res){
            if(err) throw err;
            const roles = res.map(el => el.title);
            inquirer.prompt(
                {
                    type : "rawlist",
                    message : "Choose the role you wsh to delete :",
                    name : "role",
                    choices : roles
                }
            ).then(function(roleRes){
                
                //Separating the id of role to be deleted
                const roleId = res.find(el => el.title === roleRes.role);
                connection.query(`DELETE FROM role WHERE ?`,
                {
                    role_id : roleId.id
                },
                function(err, res){
                    if(err) throw err;
                    console.log("-----------------");
                    console.log("ROLE DELETED !!!");
                    console.log("-----------------");
                    confirm.confirm();
                })

            })
        })

}
module.exports = {deleteRole};