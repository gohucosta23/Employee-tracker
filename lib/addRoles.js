const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

function addRoles(){

        connection.query(`SELECT * FROM department`,
        function(err, departmentRes){
            if(err) throw err;
            //Getting all the department names
            const departments = departmentRes.map(el => el.department_name);
        

        inquirer.prompt([
            {
                type : "rawlist",
                message : "Choose department :",
                name : "department",
                choices : departments

            },
            {
                message : "Enter new Job Title :",
                name : "role"
            },
            {
                message : "What is the Salary for this position ?",
                name : "salary"
            }
        ]).then(function(roleRes){

            connection.query(`SELECT * FROM role`, function(err, res){

                if(err) throw err;
                //Getting all role titles
                const duplicateRole = res.map(el => el.title);
                // Getting the id for each department
                const departmentID = departmentRes.find(el => el.department_name === roleRes.department);
                // Turning all letters to lower case and splitting in case of more than one word
                const arrSpl = roleRes.role.toString().toLowerCase().split(" ");
                //Making the first letter of each word uppercase
                const newArr = arrSpl.map(el => el.charAt(0).toUpperCase() + el.slice(1));
                //Joining if more than one word
                const role = newArr.join(" ");

                // Checking if the role already exists
                if(duplicateRole.indexOf(role) === -1){
                
                connection.query(`INSERT INTO role SET ?`,
                {
                    title : role,
                    salary : roleRes.salary,
                    department_id : departmentID.department_id
                }, 
                function(err, res){
                    if(err) throw err;
                    console.log("------------------");
                    console.log("JOB ROLE ADDED !!!");
                    console.log("------------------");
                    confirm.confirm();
                })
            }
            else {
                console.log("-----------------------------------");
                console.log("THE COMPANY ALREADY HAVE THIS ROLE !!!");
                console.log("-----------------------------------");
                // Imported function that checks if they want to do another transaction
                confirm.confirm();
            }

            });
        });
    });

}

module.exports = {addRoles};