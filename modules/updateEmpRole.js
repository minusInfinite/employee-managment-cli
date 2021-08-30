const inquirer = require("inquirer")
const updateEmp = require("../queries/update.js")
const managerId = require("../queries/find.js")
const { listRoles, listEmp, listManagers } = require("../queries/lists.js")

async function updateEmpRole() {
    const roleList = await listRoles()
    const empList = await listEmp()
    const managerList = await listManagers()
    await inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Select Employee's",
                choices: empList,
                filter: (answer) => {
                    id = empList.findIndex((el) => el === answer) + 1
                    return id
                    //the arr index starts at 0 but the database id starts at 1
                    //the +1 to findIndex should allign the return
                },
            },
            {
                type: "list",
                name: "column",
                message: "What do you want update?",
                choices: ["Role", "Manager"],
            },
            {
                type: "list",
                name: "title",
                message: "Select Employee's Role",
                choices: roleList,
                filter: (answer) => {
                    id = roleList.findIndex((el) => el === answer) + 1
                    return id
                    //the arr index starts at 0 but the database id starts at 1
                    //the +1 to findIndex should allign the return
                },
                when(answers) {
                    return answers.column === "Role"
                },
            },
            {
                type: "list",
                name: "manager",
                message: "Select Employee's Manager",
                choices: () => {
                    //as Array.concat() returns a new array this will add a None option
                    //this will allow it possilbe to isolate a value for NULL
                    return managerList.concat(["None"])
                },
                filter: async (answer) => {
                    let result
                    if (answer !== "None") {
                        result = await managerId(answer)
                        //get the employee id for the manager.
                    } else {
                        result = false
                    }
                    return result
                },
                when(answers) {
                    return answers.column === "Manager"
                },
            },
        ])
        .then(async (answers) => {
            const columnid =
                answers.column === "Role" ? answers.title : answers.manager
            await updateEmp(answers.employee, answers.column, columnid)
        })
        .catch((err) => console.log(err))
}

module.exports = updateEmpRole
