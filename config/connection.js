require("dotenv").config()
const mysql = require("mysql2")
const chalk = require("chalk")

const db = mysql.createConnection(
    {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
    },
    console.info(chalk.green("✔️ "))
)

module.exports = db
