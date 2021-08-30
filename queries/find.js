const db = require("../config/connection")

const findManagerId = /*sql*/ `SELECT 
id
FROM employee 
WHERE concat(first_name,' ',last_name) = ?;`

const managerId = async (fullname) => {
    let id
    try {
        const conn = await db
        const [rows, fields] = await conn.query(findManagerId, [fullname])
        id = rows[0].id
        return id
    } catch (e) {
        console.error(e)
    }
    return id
}

module.exports = managerId
