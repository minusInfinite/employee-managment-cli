require("dotenv").config()
const mysql = require("mysql2/promise")
const chalk = require("chalk")

const db = mysql.createConnection(
    {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME,
        decimalNumbers: true,
    },
    console.info(chalk.green("✔️ Connected to database"))
)

module.exports = db
