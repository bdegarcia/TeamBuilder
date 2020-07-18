const inquirer = require("inquirer");
const Intern = require("./Intern");
const Engineer = require("./Engineer");
const Manager = require("./Manager");
const questions = require("./questions");
let id = 0

function askQuestions(){
    return inquirer.prompt(questions.general)
};
function askManagerQuestions(){
    return inquirer.prompt(questions.Manager)
};
function askEngineerQuestions(){
    return inquirer.prompt(questions.Engineer)
};
function askInternQuestions(){
    return inquirer.prompt(questions.Intern)
}
function otraVez(){
    return inquirer.prompt(questions.again)
}

async function employeeList(){
    const managerEmp = {};
    const internList = [];
    const engineerList = [];
    const again = true;

    while(again){
    id += 1;
    let employee = await askQuestions();
    let employeeFullName = `${employee.firstname} ${employee.lastname}`
    let employeeEmail = employeeFullName.trim() + '@working.com'

    switch(employee.role){
        case 'Manager':
            const roleQuestions = await askManagerQuestions();
            employee = new Manager(employeeFullName, id, employeeEmail, roleQuestions.office)
            managerEmp.push(employee);
        case 'Intern':
            const roleQuestions = await askInternQuestions();
            employee = new Intern(employeeFullName, id, employeeEmail, roleQuestions.school)
            internList.push(employee);
        case 'Engineer':
            const roleQuestions = await askEngineerQuestions();
            employee = new Engineer(employeeFullName, id, employeeEmail, roleQuestions.github)
            engineerList.push(employee);
        };

        again = otraVez();
    }
}


employeeList();