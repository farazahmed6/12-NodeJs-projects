"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 10) + 1;
// Define the Inquirer questions
const questions = [
    {
        type: "input",
        name: "guess",
        message: chalk_1.default.blue("Guess the number (1-10): "),
        validate: (input) => {
            const guess = parseInt(input);
            if (isNaN(guess) || guess < 1 || guess > 10) {
                return chalk_1.default.red("Please enter a valid number between 1 and 10.");
            }
            return true;
        },
    },
];
function playGame() {
    inquirer_1.default.prompt(questions).then((answers) => {
        const guess = parseInt(answers.guess);
        if (guess === secretNumber) {
            console.log(chalk_1.default.green("Congratulations! You guessed the correct number!"));
            process.exit(0);
        }
        else if (guess < secretNumber) {
            console.log(chalk_1.default.yellow("Try a higher number."));
        }
        else {
            console.log(chalk_1.default.yellow("Try a lower number."));
        }
        playGame(); // Ask for another guess
    });
}
console.log(chalk_1.default.yellow("Welcome to the Number Guessing Game!"));
console.log(chalk_1.default.yellow("I have selected a random number between 1 and 10."));
console.log(chalk_1.default.yellow("Try to guess it!"));
playGame();
