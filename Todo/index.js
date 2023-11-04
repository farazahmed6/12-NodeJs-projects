#!/usr/bin/env node
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
const inquirer_1 = __importDefault(require("inquirer"));
let todos = []; // ToDos store
let loop = true;
let answers1;
let answers2;
let answers3;
function startLoop() {
    return __awaiter(this, void 0, void 0, function* () {
        while (loop) {
            yield displayMenuItem();
        }
    });
}
startLoop();
function displayMenuItem() {
    return __awaiter(this, void 0, void 0, function* () {
        answers1 = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "menuOpt",
                choices: ["Add ToDo item", "Delete ToDo item", "Exit"],
                message: "Please select menu item: ",
            },
        ]);
        switch (answers1.menuOpt) {
            case "Add ToDo item": {
                yield addTodo();
                break;
            }
            case "Delete ToDo item": {
                yield deleteToDo();
                break;
            }
            default: {
                loop = false;
                console.log("Exit Program.");
                break;
            }
        }
    });
}
function addTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        answers2 = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "todo",
                message: "Enter  What to Do?",
            },
        ]);
        todos.push(answers2.todo);
        console.log(todos);
    });
}
function deleteToDo() {
    return __awaiter(this, void 0, void 0, function* () {
        if (todos.length > 0) {
            answers3 = yield inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "menuOpt",
                    choices: todos,
                    message: "Please select TODO for delete: ",
                },
            ]);
            let i = 0;
            do {
                if (todos[i] === answers3.menuOpt) {
                    todos.splice(i, 1);
                    break;
                }
                i++;
            } while (i < todos.length);
            console.log(todos);
        }
        else {
            console.log("No todo item to delete.");
        }
    });
}
