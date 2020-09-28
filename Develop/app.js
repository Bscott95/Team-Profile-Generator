const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const { title } = require("process");

let employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// class employee -> in that you have manager, eng, and intern. Each type has it's own questions/required data.

// gather info with inquirer

// Pass info to render function. Reder function returns a giant block of HTML.

// filewrite the results to team.html

// questions that requirer user input

// can use for writing files
const writeFileAsync = util.promisify(fs.writeFile);


// =========VALIDATION===================
//text validation
const textValidation = (input) => {
    function textIsValid (input) {
      return /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(input)
    }
    const textCheck = textIsValid(input)
  if(!textCheck){
    return 'You must enter text. Please make sure there are no extra spaces.'
  }
  return true
  };
  
  //email validation
  const emailValidation = (input) => {
      function emailIsValid (input) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
      }
      const emailCheck = emailIsValid(input)
    if(!emailCheck){
      return 'You must enter a valid email.'
    }
    return true
  };
  
  //number input validation
  const numValidation = (input) => {
    if (isNaN(input)) 
    {
      return "Must input numbers";
    }
    return true
  }

// ==================PROMPT INPUT================
// inquirer prompt about username for various values
// doen't need to be async. for practice if an API was involved
async function managerPrompt(){
    try {
        const { managerName } = await inquirer.prompt({
            type: "input",
            message: "Please enter the Managers name:",
            name: "managerName",
            validate: textValidation
        });
        const { managerId } = await inquirer.prompt({
            type: "input",
            message: "What is the Managers id?",
            name: "managerId",
            validate: numValidation
        });
        const { managerEmail } = await inquirer.prompt({
            type: "input",
            message: "What is the Managers email?",
            name: "managerEmail",
            validate: emailValidation
        });
        const { managerOfficeNumber } = await inquirer.prompt({
            type: "input",
            message: "What is the Managers office number?",
            name: "managerOfficeNumber",
            validate: numValidation
        });
        const { engineerYN } = await inquirer.prompt({
            type: "list",
            message: "Would you like to add an engineer to the team?",
            choices: ["yes", "no"],
            name: "engineerYN",
        });
        // Create Manager Object
        const manager = new Manager (managerId, managerName, managerEmail, managerOfficeNumber)
        employees.push(manager)
        console.log("126", manager)

        if(engineerYN === "yes"){
            engPrompt()
        } else if (engineerYN === "no") {
            const { internYN } = await inquirer.prompt({
                type: "list",
                message: "Would you like to add an intern?",
                choices: ["yes", "no"],
                name: "internYN",
            });
            if(internYN === "yes"){
                internPrompt();
            } else {
                const htmlRended = render(employees)
                fs.writeFileSync('./../output/team.html', htmlRended, 'utf-8')
            }
        }        

    } catch (err) {
        // log the error in case something goes wrong
        console.log(err)
    }
};

async function engPrompt() {
    try {
        const { engineerName } = await inquirer.prompt({
            type: "input",
            message: "Enter engineer name:",
            name: "engineerName",
            validate: textValidation
        });
        const { engineerId } = await inquirer.prompt({
            type: "input",
            message: "Enter engineer id:",
            name: "engineerId",
            validate: numValidation
        });
        const { engineerEmail } = await inquirer.prompt({
            type: "input",
            message: "Enter engineer email:",
            name: "engineerEmail",
            validate: emailValidation
        });
        const { engineerGitHub } = await inquirer.prompt({
            type: "input",
            message: "Enter engineers GitHub username",
            name: "engineerGitHub",
            validate: textValidation
        });
        const { engineerYN } = await inquirer.prompt({
            type: "list",
            message: "Would you like to add another engineer?",
            choices: ["yes", "no"],
            name: "engineerYN",
        });    

        // Create engineer Object
        const engineer = new Engineer (engineerName, engineerId, engineerEmail,engineerGitHub)
        employees.push(engineer); 
        console.log("126", engineer)

        if(engineerYN === "yes"){
            engPrompt()
        } else if (engineerYN === "no") {
            const { internYN } = await inquirer.prompt({
                type: "list",
                message: "Would you like to add an intern?",
                choices: ["yes", "no"],
                name: "internYN",
            });
            if(internYN === "yes"){
                internPrompt();
            } else {
                const htmlRended = render(employees)
                fs.writeFileSync('./output/team.html', htmlRended, 'utf-8')
            }
        }

    } catch (err) {
        // log the error in case something goes wrong
        console.log(err)
    }
};

async function internPrompt() {
    try {
        const { internName } = await inquirer.prompt({
            type: "input",
            message: "Enter intern name:",
            name: "internName",
            validate: textValidation
        });
        const { internId } = await inquirer.prompt({
            type: "input",
            message: "Enter intern id:",
            name: "internId",
            validate: numValidation
        });
        const { internEmail } = await inquirer.prompt({
            type: "input",
            message: "Enter intern email:",
            name: "internEmail",
            validate: emailValidation
        });
        const { internSchool } = await inquirer.prompt({
            type: "input",
            message: "Enter intern school:",
            name: "internSchool",
            validate: textValidation
        });
        const { internYN } = await inquirer.prompt({
            type: "list",
            message: "Would you like to input another intern?",
            choices: ["yes", "no"],
            name: "internYN",
        });    

        // Create intern Object
        const intern = new Intern (internName, internId, internEmail, internSchool)
        employees.push(intern); 
        console.log("126", intern)
        console.log(employees)

        if(internYN === "yes"){
            internPrompt()
        } else {
            const htmlRended = render(employees)
            fs.writeFileSync('./output/team.html', htmlRended, 'utf-8')
        }

    } catch (err) {
        // log the error in case something goes wrong
        console.log(err)
    }
};

// calls starter function
managerPrompt();

