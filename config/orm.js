//check the tutorial Ken sent you on the orm.
var connection = require("../config/connection.js")

// assigns question mark as an array then makes it a string 
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

//takes object values and turns them into SQL
function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        
        if (Object.hasOwnProperty.call(ob, key)) {
    // add quotes to strings that contain spaces 
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }    }

//retuen to string
    return arr.toString();
}

var orm = {
    selectAll: function (tableInput, callback) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            callback(results);
        });
    },

    insertOne: function(table, cols, vals, callback) {
        var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") "

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        })
    },

    updateOne: function(table, objColVals, condition, callback) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        })
    }
    
};

// Export 
module.exports = orm;