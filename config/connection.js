//install database dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//initialize connection
var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Dogman2010!",
    database: "burgers_db"
  });
};

// start connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;