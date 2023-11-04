#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const answers = await inquirer_1.default.prompt([
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
let result;
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
