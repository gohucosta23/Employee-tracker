const inquirer = require("inquirer");
const mysql = require("mysql");
const start = require("../index");
const databaseConnection = require("./databaseConnection");
const connection = mysql.createConnection(databaseConnection);

// Function that display a question after every transaction checking if they have another one

function confirm(){
    inquirer.prompt(
        {
            type : "confirm",
            message : "Do you have another transaction ?",
            name : "confirm"

        }).then(function(res){
            if(res.confirm){
                // Goes back to the initial questions
                start.start();
            }
            else {
                // Ends connection
                connection.end();
              
            }
        })
}
module.exports = {confirm};