#!/usr/bin/env node
import inquirer from "inquirer";
console.log("WORD COUNT GAME");
const counter = (text: string) => text.replace(/\s/g, "").length;
async function startWordCount(counter: (text: string) => number) {
  do {
    let response = await inquirer.prompt({
      type: "input",
      message: "write a text here...",
      name: "text",
    });

    console.log(counter(response.text));
  } while (true);
}
startWordCount(counter);
