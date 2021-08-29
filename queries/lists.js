const { printTable } = require("console-table-printer")
const db = require("../config/connection.js")

const depQuery = /*sql*/ `SELECT name FROM Department;`

const roleQuery = /*sql*/ `SELECT title AS name FROM role;`

const empQuery = /*sql*/ `SELECT concat(first_name,' ',last_name) AS 'Employee' FROM employee`

const managerQuery = /*sql*/ `SELECT concat(first_name,' ',last_name) AS 'Manager' FROM employee WHERE manager_id IS NULL;`

const listDeps = async () => {
    let list = []
    try {
        const conn = await db
        const [rows, fields] = await conn.query(depQuery)
        let names = rows.map((obj) => {
            return obj.name
        })
        list = names
        return list
    } catch (e) {
        console.error(e)
    }
    return list
}

const listRoles = async () => {
    let list = []
    try {
        const conn = await db
        const [rows, fields] = await conn.query(roleQuery)
        let names = rows.map((obj) => {
            return obj.name
        })
        list = names
        return list
    } catch (e) {
        console.error(e)
    }
    return list
}

const listEmp = async () => {
    let list = []
    try {
        const conn = await db
        const [rows, fields] = await conn.query(empQuery)
        let names = rows.map((obj) => {
            return obj.name
        })
        list = names
        return list
    } catch (e) {
        console.error(e)
    }
    return list
}

const listManagers = async () => {
    let list = []
    try {
        const conn = await db
        const [rows, fields] = await conn.query(managerQuery)
        let names = rows.map((obj) => {
            return obj.name
        })
        list = names
        return list
    } catch (e) {
        console.error(e)
    }
    return list
}

module.exports = { listDeps, listRoles, listEmp, listManagers }
