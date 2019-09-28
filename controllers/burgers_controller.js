//packages, again. I owe about 4 people beers for thier help nudging me through this. 
var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js")

// Post function to make new burger
router.post("/api/burgers", function (req, res) {
    console.log("testing", req.body)
    burger.insertOne([
        "burger_name", "devoured"
    ], [
            req.body.burger_name, false
        ], function (results) { 
            res.redirect("/")
        })
})

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows === 0) {
            // if no changes, throw 404 error
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var burgersObj = {
            burgers: data
        };
        console.log(burgersObj);
        res.render("index", burgersObj);
    });
});
// Export 
module.exports = router;