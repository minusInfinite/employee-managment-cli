const { printTable } = require("console-table-printer")
const db = require("../config/connection")

/*
 * SQL Queries to insert then display inserted data
 */
const depInsertQuery = /*sql*/ `INSERT INTO Department (name) VALUES (?)`
const depSelQuery = /*sql*/ `SELECT name AS 'Department Name' FROM Department WHERE id = (?)`

const roleInsertQuery = /*sql*/ `INSERT INTO Role (title, salary,department_id) VALUES (?,?,?)`
const roleSelQuery = /*sql*/ `
SELECT 
role.id AS 'Role ID', 
role.title AS 'Title',
role.salary AS 'Salary',
department.name AS 'Department'
FROM role INNER JOIN department ON role.department_id=department.id
WHERE role.id = (?);`

const empInsertQuery = /*sql*/ `INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
const empSelQuery = /*sql*/ `
SELECT 
E.id, 
concat(E.first_name,' ',E.last_name) AS 'Full Name',
R.title AS 'Title',
D.name AS 'Department',
concat(M.first_name,' ',M.last_name) AS 'Manager Name'
FROM employee E INNER JOIN (department D, role R) ON (E.role_id=R.id AND R.department_id=D.id),
employee M WHERE E.manager_id = M.id AND E.id = (?);`

//Insert a new Department name
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

//insert a new title, salary with a linked department id
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

//insert a new employee with their first and last name, role and manager.
const insertEmp = async function (first_name, last_name, role_id, manager_id) {
    try {
        if (!first_name || !last_name || !role_id) {
            throw new Error("Name Required")
        }
        if (!manager_id) {
            manager_id = null
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
