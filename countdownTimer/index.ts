#!/usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";

//user input,output and time setting function
const res = await inquirer.prompt({
  type: "number",
  name: "userInput",
  message: chalk.yellowBright.bold('Please enter the "Time" in second'),
  validate: (input) => {
    if (isNaN(input)) {
      return chalk.redBright.bold(" please enter valid number");
    } else if (input > 60) {
      return chalk.blueBright.italic("seconds must must be in 60");
    } else {
      return true;
    }
  },
});

//time setting
let input = res.userInput;
function startTime(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(intTime);
  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currentTime);

    if (timeDiff <= 0) {
      console.log(chalk.redBright.bold.italic("Timer has expired"));
      process.exit(); // to stop
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(
      `${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`
    );
  }, 1000);
}

startTime(input);
