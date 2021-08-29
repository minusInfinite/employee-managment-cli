const inquirer = require("inquirer")
const { indexDeps, indexRoles, indexEmp } = require("../queries/formated")

const addDepartment = require("./addDep")
const addRole = require("./addRole")
const addEmp = require("./addEmp")

/** @type {inquirer.QuestionCollection} */
const mainMenuPrompts = {
    type: "list",
    name: "action",
    message: "Please select and action",
    choices: [
        "View All Departments",
        "Add Department",
        "View All Roles",
        "Add Role",
        "View All Employees",
        "Add Employee",
        "Quit",
    ],
}

function mainMenu() {
    inquirer
        .prompt(mainMenuPrompts)
        .then(async (answers) => {
            if (answers.action === "View All Departments") {
                await indexDeps()
                mainMenu()
            }
            if (answers.action === "Add Department") {
                await addDepartment()
                mainMenu()
            }
            if (answers.action === "View All Roles") {
                await indexRoles()
                mainMenu()
            }
            if (answers.action === "Add Role") {
                await addRole()
                mainMenu()
            }
            if (answers.action === "View All Employees") {
                await indexEmp()
                mainMenu()
            }
            if (answers.action === "Add Employee") {
                await addEmp()
                mainMenu()
            }
            if (answers.action === "Quit") {
                console.log("goodbye")
                process.exit()
            }
        })
        .catch((err) => console.error(err))
}

module.exports = mainMenu
