const { printTable } = require("console-table-printer")
const db = require("../config/connection.js")

const empSelQuery = /*sql*/ `SELECT 
E.id, 
concat(E.first_name,' ',E.last_name) AS 'Full Name',
R.title AS 'Title',
D.name AS 'Department',
concat(M.first_name,' ',M.last_name) AS 'Manager Name'
FROM employee E INNER JOIN (department D, role R) ON (E.role_id=R.id AND R.department_id=D.id),
employee M WHERE E.manager_id = M.id AND E.id = (?);`

const updateEmp = async function (id, column, columnId) {
    try {
        if (!id) {
            throw new Error(`Missing ID`)
        }
        if (!column) {
            throw new Error(`Missing Column`)
        } else if (column === "Role") {
            column = "role_id"
        } else if (column === "Manager") {
            column = "manager_id"
        }
        if (!columnId && column === "Role") {
            throw new Error("No Column ID")
        }
        if (!columnId && column === "Manager") {
            columnId = null
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
