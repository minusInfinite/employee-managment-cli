const db = require("../config/connection.js")

//SQL Queries to allow a list of values to be generated
const depQuery = /*sql*/ `SELECT name FROM Department ORDER By id;`

const roleQuery = /*sql*/ `SELECT title AS name FROM role ORDER By id;`

const empQuery = /*sql*/ `SELECT concat(first_name,' ',last_name) AS name FROM employee ORDER By id`

const managerQuery = /*sql*/ `SELECT concat(first_name,' ',last_name) AS name FROM employee WHERE manager_id IS NULL ORDER By id;`

//Return a list of Departments
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

//Return a list of Role Titles
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

//Return a list of Employee Full Names
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

//Return a list of Employee Full Names
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
