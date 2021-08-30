const { printTable } = require("console-table-printer")
const db = require("../config/connection.js")

//SQL Queries, done is a way to provide a more "Formatted" output
const depQuery = /*sql*/ `SELECT id AS 'ID', name AS 'Department Name' FROM Department ORDER By id;`

//A simple Inner Join query to display the Department ID with it's name
const roleQuery = /*sql*/ `
SELECT 
Role.id AS 'Role ID', 
Role.title AS 'Title',
Role.salary AS 'Salary',
department.name AS 'Department'
FROM Role INNER JOIN Department ON Role.department_id=Department.id ORDER By Role.id;`

//SQL Self-Join to display the Manager name bases on their own ID
//With an Inner Join to show data from Role and Department Tables
const empQuery = /*sql*/ `
SELECT
E.id, 
concat(E.first_name,' ',E.last_name) AS 'Full Name',
R.title AS 'Title',
R.salary AS 'Salary',
D.name AS 'Department',
concat(M.first_name,' ',M.last_name) AS 'Manager Name'
FROM employee E INNER JOIN (department D, role R) ON (E.role_id=R.id AND R.department_id=D.id)
LEFT JOIN employee M ON M.id = E.manager_id WHERE E.manager_id IS NULL OR E.manager_id IS NOT NULL
ORDER BY E.role_id;
`

/**
 * A Function that triggers to Department Table to be printed to the console
 * @returns {Promise<void>}
 */
const indexDeps = async () => {
    try {
        const conn = await db
        const [rows, fields] = await conn.query(depQuery)
        if (rows.length === 0) {
            throw new Error("No Departments in Database, You need to add some")
        }
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
    return
}

/**
 * A Function that triggers to Role Table to be printed to the console
 * @returns {Promise<void>}
 */
const indexRoles = async () => {
    try {
        const conn = await db
        const [rows, fields] = await conn.query(roleQuery)
        if (rows.length === 0) {
            throw new Error("No Roles in Database, You need to add some")
        }
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
    return
}

/**
 * A Function that triggers to Employee Table to be printed to the console
 * @returns {Promise<void>}
 */
const indexEmp = async () => {
    try {
        const conn = await db
        const [rows, fields] = await conn.query(empQuery)
        if (rows.length === 0) {
            throw new Error("No Employees in Database, You need to add some")
        }
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
    return
}

module.exports = { indexDeps, indexRoles, indexEmp }
