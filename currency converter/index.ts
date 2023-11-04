import chalk from "chalk";
import inquirer from "inquirer";

// currency converter API link
let apilink =
  "https://v6.exchangerate-api.com/v6/074e4920687aaae5a5e49e64/latest/PKR";

// Fetching data
let fetchData = async (data: any) => {
  let fetchData = await fetch(data);
  let res = await fetchData.json();
  return res.conversion_rates;
};

// object Array
let data = await fetchData(apilink);
let countries = Object.keys(data);

// user input first country
let firstCountry = await inquirer.prompt({
  type: "list",
  name: "name",
  message: " Converting from",
  choices: countries,
});

// first country money
let userMoney = await inquirer.prompt({
  type: "number",
  name: "rupee",
  message: `Please enter the amount in ${chalk.greenBright.bold(
    firstCountry.name
  )}`,
});

//  convert country
let secondCountry = await inquirer.prompt({
  type: "list",
  name: "name",
  message: "Converting To",
  choices: countries,
});

// conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/074e4920687aaae5a5e49e64/pair/${firstCountry.name}/${secondCountry.name}`;

// fetching data for conversion rate
let cnvData = async (data: any) => {
  let cnvData = await fetch(data);
  let res = await cnvData.json();
  return res.conversion_rate;
};

let conversionRate = await cnvData(cnv);

let convertedRate = userMoney.rupee * conversionRate;

console.log(
  `Your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(
    userMoney.rupee
  )} in ${chalk.bold.greenBright(
    secondCountry.name
  )} is ${chalk.bold.greenBright(convertedRate)}`
);
