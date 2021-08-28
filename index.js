const inquirer = require("inquirer")
const { printTable } = require("console-table-printer")

const db = require("./config/connection.js")

db.query("select * from employee", function (err, results, fields) {
    if (err) {
        console.error(err)
    }
    printTable(results)
})
