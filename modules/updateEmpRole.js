const inquirer = require("inquirer")
const updateEmp = require("../queries/update.js")
const { listRoles, listEmp } = require("../queries/lists.js")

async function updateEmpRole() {
    const roleList = await listRoles()
    const empList = await listEmp()
    await inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Select Employees Role",
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
                name: "title",
                message: "Select Employees Role",
                choices: roleList,
                filter: (answer) => {
                    id = roleList.findIndex((el) => el === answer) + 1
                    return id
                    //the arr index starts at 0 but the database id starts at 1
                    //the +1 to findIndex should allign the return
                },
            },
        ])
        .then(async (answers) => {
            await updateEmp(answers.employee, answers.title)
        })
        .catch((err) => console.log(err))
}

module.exports = updateEmpRole
