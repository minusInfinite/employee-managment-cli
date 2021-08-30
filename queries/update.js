const { printTable } = require("console-table-printer")
const db = require("../config/connection.js")
const empUpdateQuery = /*sql*/ `UPDATE employee SET role_id = (?) WHERE id = (?)`
const empSelQuery = /*sql*/ `SELECT 
E.id, 
concat(E.first_name,' ',E.last_name) AS 'Full Name',
R.title AS 'Title',
D.name AS 'Department',
concat(M.first_name,' ',M.last_name) AS 'Manager Name'
FROM employee E INNER JOIN (department D, role R) ON (E.role_id=R.id AND R.department_id=D.id),
employee M WHERE E.manager_id = M.id AND E.id = (?);`

const updateEmp = async function (id, role_id) {
    try {
        if (!id) {
            throw new Error(`Missing ID`)
        }
        if (!role_id) {
            throw new Error(`Missing Role`)
        }
        const conn = await db
        const update = await conn.execute(empUpdateQuery, [role_id, id])
        const [rows, fields] = await conn.execute(empSelQuery, [id])
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
}

module.exports = updateEmp
