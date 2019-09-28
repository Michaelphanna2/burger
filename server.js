//create dependencies
var express = require("express");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8050;
var app = express();

// create static file
app.use(express.static("public"));

// Parse the json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// create routes and access
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

// Start the server
app.listen(PORT, function() {
console.log("Server listening on: http://localhost:" + PORT);
});