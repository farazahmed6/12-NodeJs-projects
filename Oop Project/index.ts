import inquirer from "inquirer";

class Book {
  constructor(
    public title: string,
    public author: string,
    public isbn: string,
    public available: boolean = true
  ) {}

  displayInfo() {
    console.log("Title:", this.title);
    console.log("Author:", this.author);
    console.log("ISBN:", this.isbn);
    console.log("Available:", this.available ? "Yes" : "No");
  }
}

class Library {
  private books: Book[] = [];

  addBook(book: Book) {
    this.books.push(book);
  }

  removeBook(isbn: string) {
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

async function startApp() {
  console.log("Welcome to the Book Management System");
  await promptUser();
}

async function promptUser() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Select an option:",
      choices: ["Add a book", "Remove a book", "Display all books", "Exit"],
    },
  ]);

  switch (answer.choice) {
    case "Add a book":
      await addBookPrompt();
      break;
    case "Remove a book":
      await removeBookPrompt();
      break;
    case "Display all books":
      library.displayBooks();
      await promptUser();
      break;
    case "Exit":
      console.log("Goodbye!");
      break;
  }
}

async function addBookPrompt() {
  const answers = await inquirer.prompt([
    { type: "input", name: "title", message: "Enter book title:" },
    { type: "input", name: "author", message: "Enter author:" },
    { type: "input", name: "isbn", message: "Enter ISBN:" },
  ]);

  const book = new Book(answers.title, answers.author, answers.isbn);
  library.addBook(book);
  console.log("Book added successfully.");
  await promptUser();
}

async function removeBookPrompt() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "isbn",
      message: "Enter ISBN of the book to remove:",
    },
  ]);

  library.removeBook(answer.isbn);
  console.log("Book removed successfully.");
  await promptUser();
}

startApp();
