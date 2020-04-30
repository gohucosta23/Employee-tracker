const mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require("./confirm");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);


function addEmployee(){

    

    connection.query(`SELECT * FROM employee `, function(err,empRes){

        if(err) throw err;
        // Getting all employes and concatenating first and ast name to display
        let employeeNames = empRes.map(element =>  element.firstName +" "+ element.lastName);

            connection.query(`SELECT * FROM role`, function(err, roleRes){
                if(err) throw err;
                //Gettin role titles to display in list
                const roles = roleRes.map(elem => elem.title);

                
                inquirer.prompt([
                    {
                        message : "Enter first name :",
                        name : "firstName"
                    },
                    {
                        message : "Enter last name :",
                        name : "lastName"
                    },
                    {
                        type : "rawlist",
                        message : "Choose role :",
                        name : "role",
                        choices : roles
                    },
                    {
                        type : "rawlist",
                        message : "Choose employee manager :",
                        name : "manager",
                        choices : employeeNames
                    }
                    ]).then(function(addEmployeeRes){

                    // Getting the id of role for new employee  
                    const index = roleRes.find(el => el.title === addEmployeeRes.role);
                    // Getting the employee id of manager
                    const empId = empRes.find(el => el.firstName + " " + el.lastName === addEmployeeRes.manager)
                    
                    connection.query(`INSERT INTO employee SET ?`,
                    {
                        firstName : addEmployeeRes.firstName,
                        lastName : addEmployeeRes.lastName,
                        role_id : index.role_id,
                        manager_id : empId.id

                    },function(err){

                        if(err) throw err;
                        console.log("-------------------");
                        console.log("EMPLOYEE ADDED !!!!");
                        console.log("-------------------");
                        confirm.confirm();
                    });
                });
    });
});
}
module.exports = {addEmployee};