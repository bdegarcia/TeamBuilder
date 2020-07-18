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
    return inquirer.prompt(questions.manager)
};
function askEngineerQuestions(){
    return inquirer.prompt(questions.engineer)
};
function askInternQuestions(){
    return inquirer.prompt(questions.intern)
}
function otraVez(){
    return inquirer.prompt(questions.again)
}

async function employeeList(){
    let again = true;
    const employees = []
    while(again){
        id += 1;
        let employee = await askQuestions();
        let employeeFullName = `${employee.firstname} ${employee.lastname}`
        let employeeEmail = `${employee.firstname}${employee.lastname}` + '@working.com'
        console.log(employee)    
        switch(employee.role){
            case 'Manager':
                let manRoleQuestions = await askManagerQuestions();
                employee = new Manager(employeeFullName, id, employeeEmail, manRoleQuestions.office)
                employees.push(employee)
                break;
            case 'Intern':
                let intRoleQuestions = await askInternQuestions();
                employee = new Intern(employeeFullName, id, employeeEmail, intRoleQuestions.school)
                employees.push(employee)
                break;
            case 'Engineer':
                let engRoleQuestions = await askEngineerQuestions();
                employee = new Engineer(employeeFullName, id, employeeEmail, engRoleQuestions.github)
                employees.push(employee)
                break;

        };

        again = await otraVez() 
        again = again.again
    } // while
    const html = render(employees);
    fs.writeFile(outputPath, html, (err) => {
        if(err) throw err;
        console.log('Great Success');        
})
}



employeeList();