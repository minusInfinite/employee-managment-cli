const inquirer = require("inquirer")
const mainMenu = require("./menu.js")
const { insertEmp } = require("../queries/inserts.js")
const { listRoles, listManagers } = require("../queries/lists.js")

async function addEmp() {
    const roleList = await listRoles()
    /**
     * @type {Array} mangaerList
     */
    const managerList = await listManagers()
    await inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "Enter Employees First Name",
            },
            {
                type: "input",
                name: "lastname",
                message: "Enter Employees Last Name",
            },
            {
                type: "list",
                name: "title",
                message: "Select Employees Role",
                choices: roleList,
                filter: (answer) => {
                    return roleList.findIndex((el) => el === answer)
                },
            },
            {
                type: "list",
                name: "manager",
                message: "Select Reporting Manager",
                choices: () => {
                    return managerList.concat(["None"])
                },
                filter: (answer) => {
                    let result
                    if (answer !== "None") {
                        result = managerList.findIndex((el) => el === answer)
                    } else {
                        result = false
                    }
                    return result
                },
            },
        ])
        .then(async (answers) => {
            await insertEmp(
                answers.firstname,
                answers.lastname,
                answers.title,
                answers.manager
            )
        })
        .catch((err) => console.log(err))
}

module.exports = addEmp
