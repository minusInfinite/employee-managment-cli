const inquirer = require("inquirer")
const { insertEmp } = require("../queries/inserts.js")
const { listRoles, listManagers } = require("../queries/lists.js")

async function addEmp() {
    const roleList = await listRoles()
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
                    id = roleList.findIndex((el) => el === answer) + 1
                    return id
                    //the arr index starts at 0 but the database id starts at 1
                    //the +1 to findIndex should allign the return
                },
            },
            {
                type: "list",
                name: "manager",
                message: "Select Reporting Manager",
                choices: () => {
                    //as Array.concat() returns a new array this will add a None option
                    //this will allow it possilbe to isolate a value for NULL
                    return managerList.concat(["None"])
                },
                filter: (answer) => {
                    let result
                    if (answer !== "None") {
                        result =
                            managerList.findIndex((el) => el === answer) + 1
                        //the arr index starts at 0 but the database id starts at 1
                        //the +1 to findIndex should allign the return
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
