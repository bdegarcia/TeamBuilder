questions = {
    general: [
      {
        type: "input",
        name: "firstname",
        message: "Enter the employees first name:"
      },
      {
        type: "input",
        name: "lastname",
        message: "Enter the employees last name:"
      },
      {
        type: "list",
        name: "role",
        message: "Enter the employees role:",
        choices: ["Engineer", "Intern", "Manager"]
      }
    ],
  
    manager: [
      {
        type: "input",
        name: "office",
        message: "Enter the employees office number:"
      }
    ],
  
    intern: [
      {
        type: "input",
        name: "school",
        message: "Enter the employees school:"
      }
    ],
  
    engineer: [
      {
        type: "input",
        name: "github",
        message: "Enter the employees github account:"
      }
    ],
  
    again: [
      {
        type: "confirm",
        name: "again",
        message: "Would you like to add another employee?",
        default: true
      } 
    ]
  };
  
  module.exports = questions;