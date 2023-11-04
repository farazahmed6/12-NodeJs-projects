#!/usr/bin/env node
import inquirer from "inquirer";

const answers = await inquirer.prompt([
  {
    type: "number",
    name: "numberOne",
    message: "Enter the First number: ",
  },
  {
    type: "number",
    name: "numberTwo",
    message: "Enter the Second number: ",
  },
  {
    type: "list",
    name: "operator",
    message: "select the operator you want to perform: ",
    choices: ["Add", "Subtract", "Multiply", "Divide"],
  },
]);

let result: number;

switch (answers.operator) {
  case "Add":
    result = answers.numberOne + answers.numberTwo;
    console.log(" The answer for the Addition is : " + result);
    break;

  case "Subtract":
    result = answers.numberOne - answers.numberTwo;
    console.log(" The answer for the Subtraction is : " + result);
    break;

  case "Multiply":
    result = answers.numberOne * answers.numberTwo;
    console.log(" The answer for the Multiplication is: " + result);
    break;

  case " Divide":
    result = answers.numberOne / answers.numberTwo;
    console.log(" The answer for the Division is:  " + result);
    break;
}
