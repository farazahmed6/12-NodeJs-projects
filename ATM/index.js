#!/usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
const createUser = () => {
    let users = [];
    for (let i = 0; i < 10; i++) {
        let user = {
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
const atmMachine = async (users) => {
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
    }
    else {
        console.log("Invalid user pin");
    }
};
// ATM Function
const atmFunc = async (user) => {
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
