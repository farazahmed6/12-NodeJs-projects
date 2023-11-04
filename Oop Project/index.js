var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
class Book {
    constructor(title, author, isbn, available = true) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.available = available;
    }
    displayInfo() {
        console.log("Title:", this.title);
        console.log("Author:", this.author);
        console.log("ISBN:", this.isbn);
        console.log("Available:", this.available ? "Yes" : "No");
    }
}
class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(isbn) {
        const index = this.books.findIndex((book) => book.isbn === isbn);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }
    displayBooks() {
        console.log("Library Books:");
        this.books.forEach((book) => {
            book.displayInfo();
            console.log("-------------------------");
        });
    }
}
const library = new Library();
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Welcome to the Book Management System");
        yield promptUser();
    });
}
function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Select an option:",
                choices: ["Add a book", "Remove a book", "Display all books", "Exit"],
            },
        ]);
        switch (answer.choice) {
            case "Add a book":
                yield addBookPrompt();
                break;
            case "Remove a book":
                yield removeBookPrompt();
                break;
            case "Display all books":
                library.displayBooks();
                yield promptUser();
                break;
            case "Exit":
                console.log("Goodbye!");
                break;
        }
    });
}
function addBookPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer.prompt([
            { type: "input", name: "title", message: "Enter book title:" },
            { type: "input", name: "author", message: "Enter author:" },
            { type: "input", name: "isbn", message: "Enter ISBN:" },
        ]);
        const book = new Book(answers.title, answers.author, answers.isbn);
        library.addBook(book);
        console.log("Book added successfully.");
        yield promptUser();
    });
}
function removeBookPrompt() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer.prompt([
            {
                type: "input",
                name: "isbn",
                message: "Enter ISBN of the book to remove:",
            },
        ]);
        library.removeBook(answer.isbn);
        console.log("Book removed successfully.");
        yield promptUser();
    });
}
startApp();
