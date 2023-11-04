"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
// currency converter API link
let apilink = "https://v6.exchangerate-api.com/v6/074e4920687aaae5a5e49e64/latest/PKR";
// Fetching data
let fetchData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let fetchData = yield fetch(data);
    let res = yield fetchData.json();
    return res.conversion_rates;
});
// object Array
let data = await fetchData(apilink);
let countries = Object.keys(data);
// user input first country
let firstCountry = await inquirer_1.default.prompt({
    type: "list",
    name: "name",
    message: " Converting from",
    choices: countries,
});
// first country money
let userMoney = await inquirer_1.default.prompt({
    type: "number",
    name: "rupee",
    message: `Please enter the amount in ${chalk_1.default.greenBright.bold(firstCountry.name)}`,
});
//  convert country
let secondCountry = await inquirer_1.default.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});
// conversion rate
let cnv = `https://v6.exchangerate-api.com/v6/074e4920687aaae5a5e49e64/pair/${firstCountry.name}/${secondCountry.name}`;
// fetching data for conversion rate
let cnvData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let cnvData = yield fetch(data);
    let res = yield cnvData.json();
    return res.conversion_rate;
});
let conversionRate = await cnvData(cnv);
let convertedRate = userMoney.rupee * conversionRate;
console.log(`Your ${chalk_1.default.bold.greenBright(firstCountry.name)} ${chalk_1.default.bold.greenBright(userMoney.rupee)} in ${chalk_1.default.bold.greenBright(secondCountry.name)} is ${chalk_1.default.bold.greenBright(convertedRate)}`);
