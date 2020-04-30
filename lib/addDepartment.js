const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);


function addDepartment(){
    // Prompting for dep name...
    inquirer.prompt(
        {
        message : "Enter the name of the department you want to add :",
        name : "department"
        }
    ).then(function(res){

        connection.query(`SELECT department_name FROM department`,function(err,departmentRes){

            if(err) throw err;

            //Getting all the department names to loop through and check for existing
            const duplicateArr = departmentRes.map(el => el.department_name);
            // Making all lowercase and separating in case than more than one word
            const arrSpl = res.department.toString().toLowerCase().split(" ");
            // Turning the first letter of each word uppercase
            const newArr = arrSpl.map(el => el.charAt(0).toUpperCase() + el.slice(1));
            // Joing if more than one word
            const department = newArr.join(" ");

            //Checks for existing department
            if(duplicateArr.indexOf(department) === -1){
                
                connection.query(`INSERT INTO department SET ?`,
                {
                    department_name : department
                }, 
                function(err){
                    if(err) throw err;
                    console.log("--------------------");
                    console.log("DEPARTMENT ADDED !!!");
                    console.log("--------------------");
                    // Imported function that checks for another transaction
                    confirm.confirm();
                    
                });
            }
            else {
                // If user types a department name that already exists
                console.log("-------------------------------------------");
                console.log("THE COMPANY ALREADY HAVE THIS DEPARTMENT!!!");
                console.log("-------------------------------------------");
                confirm.confirm();
            }
        
        });
   
});
}
module.exports = {addDepartment};