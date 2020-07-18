const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require("./lib/questions")
const render = require("./lib/htmlRenderer")
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

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
    const em = [managerEmp, internList, engineerList]

    while(again){
    id += 1;
    let employee = await askQuestions();
    let employeeFullName = `${employee.firstname} ${employee.lastname}`
    let employeeEmail = employeeFullName.trim() + '@working.com'
        console.log(employee.role)
    switch(employee.role){
        case 'Manager':
            let manRoleQuestions = await askManagerQuestions();
            employee = new Manager(employeeFullName, id, employeeEmail, manRoleQuestions.office)
            managerEmp.push(employee);
            break;
        case 'Intern':
            let intRoleQuestions = await askInternQuestions();
            employee = new Intern(employeeFullName, id, employeeEmail, intRoleQuestions.school)
            internList.push(employee);
            break;
        case 'Engineer':
            let engRoleQuestions = await askEngineerQuestions();
            employee = new Engineer(employeeFullName, id, employeeEmail, engRoleQuestions.github)
            engineerList.push(employee);
            break;
        };

        again = otraVez();
        console.log(em)
    }
    const html = render(em);
    fs.writeFile(outputPath, html, (err) => {
        if(err) throw err;
        console.log('Great Success');        
    })
}


employeeList();