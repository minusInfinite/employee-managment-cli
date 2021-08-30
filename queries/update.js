const { printTable } = require("console-table-printer")
const db = require("../config/connection.js")

const empSelQuery = /*sql*/ `SELECT
E.id, 
concat(E.first_name,' ',E.last_name) AS 'Full Name',
R.title AS 'Title',
R.salary AS 'Salary',
D.name AS 'Department',
concat(M.first_name,' ',M.last_name) AS 'Manager Name'
FROM employee E INNER JOIN (department D, role R) ON (E.role_id=R.id AND R.department_id=D.id)
LEFT JOIN employee M ON M.id = E.manager_id 
WHERE (E.manager_id IS NULL OR E.manager_id IS NOT NULL) AND E.id=?;`

const updateEmp = async function (id, column, columnId) {
    try {
        if (!id) {
            throw new Error(`Missing ID`)
        }
        if (!column) {
            throw new Error(`Missing Column`)
        }
        if (!columnId && column === "Role") {
            throw new Error("No Column ID")
        }
        if (column === "Role") {
            column = "role_id"
        }
        if (columnId && column === "Manager") {
            column = "manager_id"
        }
        if (!columnId && column === "Manager") {
            columnId = null
            column = "manager_id"
        }
        const conn = await db
        const update = await conn.execute(
            `UPDATE employee SET ${column} = ? WHERE id = ?`,
            [columnId, id]
        )
        console.info(update[0].info)
        const [rows, fields] = await conn.execute(empSelQuery, [id])
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
}

module.exports = updateEmp
