const inquirer = require("inquirer")
const { printTable } = require("console-table-printer")
const { indexDeps, indexRoles, indexEmp } = require("./queries/all")

const db = require("./config/connection.js")

// db.then((conn) => conn.query("select * from employee"))
//     .then(([rows, fields]) => printTable(rows))
//     .catch((err) => console.error(err))

//indexDeps()
//indexRoles()
//indexEmp()
