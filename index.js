const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const renderHTML = require("./lib/generateHTML");
const generateTeam = require("./src/template.js");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

teamArray = [];

function init() {
    inquirer
        .prompt([
            // Existing prompts
            {
                type: 'list',
                name: 'menuOption',
                message: 'What would you like to do?',
                choices: ['Add Employee', 'Exit'],
            },
            {
                type: 'confirm',
                name: 'addEmployee',
                message: 'Would you like to add an employee?',
                when: ({ menuOption }) => menuOption === 'Add Employee',
            },
        ])
        .then((answers) => {
            if (answers.menuOption === 'Add Employee' && answers.addEmployee) {
                addEmployeeDetails();
            }

        });
}

function addEmployeeDetails() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'fullName',
                message: 'Please enter employee name'
            },
            {
                type: 'input',
                name: 'employeeId',
                message: 'Please enter the employee ID number'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter the employee email'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select the role of the employee:',
                choices: ['Manager', 'Engineer', 'Intern'],
            },
        ]).then((answers) => {
            const { role } = answers;
            switch (role) {
                case 'Manager':
                    addManager();
                    break;
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;

                default:
                    htmlBuilder;
            }
        });
}

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "OfficeNumber",
            message: "What is the manager's office number?"
        }
    ]).then(answers => {
        const manager = new Manager(answers.fullName, answers.employeeId, answers.email, answers.role, answers.OfficeNumber);
        teamArray.push(manager);
        addEmployeeDetails();
    });

}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's GitHub username?"
        }

    ]).then(answers => {
        const engineer = new Engineer(answers.fullName, answers.employeeId, answers.email, answers.engineerGithub);
        teamArray.push(engineer);
        addEmployeeDetails();
    });

}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internSchool",
            message: "What school does the intern attend?"
        }
    ]).then(answers => {
        const intern = new Intern(answers.name, answers.employeeId, answers.email, answers.internSchool);
        teamArray.push(intern);
        addEmployeeDetails();
    });

}

function htmlBuilder () {
    console.log("Team created!")

    fs.writeFileSync(outputPath, generateTeam(teamArray), "UTF-8")

}

addEmployeeDetails();

init();