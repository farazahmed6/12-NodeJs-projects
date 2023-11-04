#!/usr/bin/env node
import inquirer from "inquirer";
import { base, faker } from "@faker-js/faker";
import ListPrompt from "inquirer/lib/prompts/list.js";

//requirement
//1 user data = done
//2 atm machine =done
//3 atm machine functions

interface User {
  id: number;
  pin: number;
  name: string;
  accountNumber: number;
  balance: number;
}

const createUser = () => {
  let users: User[] = [];
  for (let i = 0; i < 10; i++) {
    let user: User = {
      id: i,
      pin: 1000 + i,
      name: faker.person.fullName(),
      accountNumber: Math.floor(100000000 * Math.random() * 900000000),
      balance: 100000000 * i,
    };
    users.push(user);
  }
  return users;
};
// ATM Machine
const atmMachine = async (users: User[]) => {
  const response = await inquirer.prompt({
    type: "number",
    message: "Write Your Pin Code",
    name: "pin",
  });

  // console.log("Welcome Account Holder")
  const user = users.find((val) => val.pin == response.pin);

  if (user) {
    console.log(`Welcome ${user.name}`);
    atmFunc(user);
    return;
  } else {
    console.log("Invalid user pin");
  }
};

// ATM Function
const atmFunc = async (user: User) => {
  const answer = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select the options you want?",
    choices: ["Withdraw", "balance", "deposite", "exit"],
  });

  if (answer.select == "Withdraw") {
    const amount = await inquirer.prompt({
      type: "number",
      message: "Enter amount",
      name: "rupee",
    });

    if (amount.rupee > user.balance) {
      return console.log("Insufficient Balance!");
    }
    // cannot withdraw > 25000
    if (amount.rupee > 25000) {
      return console.log("You cannot withdraw amount greater than 25000");
    }

    console.log(`withdraw amount: ${amount.rupee}`);
    console.log(`balance: ${user.balance - amount.rupee}`);
  }

  if (answer.select == "balance") {
    console.log(`balance: ${user.balance}`);
    return;
  }
  if (answer.select == "deposite") {
    const deposite = await inquirer.prompt({
      type: "number",
      message: "Deposite amount Enter",
      name: "rupee",
    });
    console.log(`Deposite Amoun: ${deposite.rupee}`);

    console.log(`Total Balance : ${user.balance + deposite.rupee}`);
  }

  if (answer.select == "exit") {
    console.log("Thanks for using ATM");
  }
};

const users = createUser();

atmMachine(users);
