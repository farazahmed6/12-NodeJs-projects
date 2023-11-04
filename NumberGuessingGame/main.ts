import chalk from "chalk";
import inquirer from "inquirer";

// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 10) + 1;

// Define the Inquirer questions
const questions = [
  {
    type: "input",
    name: "guess",
    message: chalk.blue("Guess the number (1-10): "),
    validate: (input: string) => {
      const guess = parseInt(input);
      if (isNaN(guess) || guess < 1 || guess > 10) {
        return chalk.red("Please enter a valid number between 1 and 10.");
      }
      return true;
    },
  },
];

function playGame() {
  inquirer.prompt(questions).then((answers) => {
    const guess = parseInt(answers.guess);

    if (guess === secretNumber) {
      console.log(
        chalk.green("Congratulations! You guessed the correct number!")
      );
      process.exit(0);
    } else if (guess < secretNumber) {
      console.log(chalk.yellow("Try a higher number."));
    } else {
      console.log(chalk.yellow("Try a lower number."));
    }

    playGame(); // Ask for another guess
  });
}

console.log(chalk.yellow("Welcome to the Number Guessing Game!"));
console.log(chalk.yellow("I have selected a random number between 1 and 10."));
console.log(chalk.yellow("Try to guess it!"));

playGame();
