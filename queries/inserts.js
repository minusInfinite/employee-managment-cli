const { printTable } = require("console-table-printer")
const db = require("../config/connection")

const depInsertQuery = /*sql*/ `INSERT INTO Department (name) VALUES (?)`
const depSelQuery = /*sql*/ `SELECT * FROM Department WHERE id = (?)`

const roleInsertQuery = /*sql*/ `INSERT INTO Role (title, salary,department_id) VALUES (?,?,?)`
const roleSelQuery = /*sql*/ `SELECT * FROM Role WHERE id = (?)`

const empInsertQuery = /*sql*/ `INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
const empSelQuery = /*sql*/ `SELECT * FROM Employee WHERE id = (?)`

const insertDep = async function (name) {
    try {
        if (!name) {
            throw new Error("Name Required")
        }
        const conn = await db
        const insert = await conn.execute(depInsertQuery, [name])
        const [rows, fields] = await conn.execute(depSelQuery, [
            insert[0].insertId,
        ])
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
}

const insertRole = async function (title, salary, department_id) {
    try {
        if (!title || !salary || !department_id) {
            throw new Error("Name Required")
        }
        const conn = await db
        const insert = await conn.execute(roleInsertQuery, [
            title,
            salary,
            department_id,
        ])
        const [rows, fields] = await conn.execute(roleSelQuery, [
            insert[0].insertId,
        ])
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
}

const insertEmp = async function (first_name, last_name, role_id, manager_id) {
    try {
        if (!first_name || !last_name || !role_id) {
            throw new Error("Name Required")
        }
        if (!manager_id) {
            manager_id = "NULL"
        }
        const conn = await db
        const insert = await conn.execute(empInsertQuery, [
            first_name,
            last_name,
            role_id,
            manager_id,
        ])
        const [rows, fields] = await conn.execute(empSelQuery, [
            insert[0].insertId,
        ])
        printTable(rows)
    } catch (e) {
        console.error(e)
    }
}

module.exports = { insertDep, insertRole, insertEmp }
