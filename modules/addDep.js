const inquirer = require("inquirer")
const { insertDep } = require("../queries/inserts.js")

async function addDepartment() {
    await inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "Enter new Department Name",
            },
        ])
        .then(async (answers) => {
            await insertDep(answers.name)
        })
        .catch((err) => console.log(err))
}

module.exports = addDepartment
