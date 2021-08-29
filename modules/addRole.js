const inquirer = require("inquirer")
const { insertRole } = require("../queries/inserts.js")
const { listDeps } = require("../queries/lists.js")

async function addRole() {
    const depList = await listDeps()
    await inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Enter new Title",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter a Base Salary",
            },
            {
                type: "list",
                name: "department",
                message: "Select a Department",
                choices: depList,
                filter: (answer) => {
                    console.log(depList.findIndex((el) => el === answer))
                    return depList.findIndex((el) => el === answer)
                },
            },
        ])
        .then(async (answers) => {
            await insertRole(
                answers.title,
                parseInt(answers.salary),
                answers.department
            )
        })
        .catch((err) => console.log(err))
}

module.exports = addRole
