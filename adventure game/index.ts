import chalk from "chalk";
import inquirer from "inquirer";

class Player {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  fuelDecrease() {
    this.fuel -= 25;
  }

  fuelIncrease() {
    this.fuel = 100;
  }
}

class Opponent {
  name: string;
  fuel: number = 100;

  constructor(name: string) {
    this.name = name;
  }

  fuelDecrease() {
    this.fuel -= 25;
  }
}

async function main() {
  const player = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Please Enter Your Name: ",
  });

  const opponent = await inquirer.prompt({
    type: "list",
    name: "select",
    message: "Select Your Opponent",
    choices: ["Skeleton", "Assassin", "Zombie"],
  });

  const p1 = new Player(player.name);
  const o1 = new Opponent(opponent.select);

  while (p1.fuel > 0 && o1.fuel > 0) {
    const ask = await inquirer.prompt({
      type: "list",
      name: "opt",
      message: "Select Your Action",
      choices: ["Attack", "Drink Health Potion", "Run for Your Life"],
    });

    if (ask.opt === "Attack") {
      const num = Math.floor(Math.random() * 2);
      if (num > 0) {
        p1.fuelDecrease();
        console.log(chalk.bold.red(`${p1.name}'s fuel is ${p1.fuel}`));
        console.log(chalk.green.red(`${o1.name}'s fuel is ${o1.fuel}`));
        if (p1.fuel <= 0) {
          console.log(
            chalk.red.bold.italic("You Lose, Better Luck Next Time!")
          );
          break;
        }
      } else {
        o1.fuelDecrease();
        console.log(chalk.green.red(`${p1.name}'s fuel is ${o1.fuel}`));
        console.log(chalk.bold.red(`${o1.name}'s fuel is ${o1.fuel}`));
        if (o1.fuel <= 0) {
          console.log(chalk.green.bold.italic("You Win"));
          break;
        }
      }
    } else if (ask.opt === "Drink Health Potion") {
      p1.fuelIncrease();
      console.log(
        chalk.bold.italic.green(
          `You Drink a Health Potion. Your Fuel is ${p1.fuel}`
        )
      );
    } else if (ask.opt === "Run for Your Life") {
      console.log(chalk.red.bold.italic("You Lose, Better Luck Next Time!"));
      break;
    }
  }
}

// Start the game
main();
