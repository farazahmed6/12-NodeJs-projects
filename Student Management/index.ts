import inquirer from "inquirer";

class Student {
  constructor(
    public id: number,
    public name: string,
    public age: number,
    public grade: number
  ) {}
}

class StudentManagementSystem {
  private students: Student[] = [];

  addStudent(student: Student) {
    this.students.push(student);
  }

  findStudentById(id: number): Student | undefined {
    return this.students.find((student) => student.id === id);
  }

  removeStudent(id: number) {
    const index = this.students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
  }

  getAllStudents(): Student[] {
    return this.students;
  }
}

const studentSystem = new StudentManagementSystem();

const studentQuestions = [
  {
    type: "input",
    name: "name",
    message: "Student Name:",
  },
  {
    type: "number",
    name: "age",
    message: "Student Age:",
  },
  {
    type: "number",
    name: "grade",
    message: "Student Grade:",
  },
];

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an action:",
        choices: [
          "Add Student",
          "Find Student",
          "Remove Student",
          "View All Students",
          "Exit",
        ],
      },
    ])
    .then((answers: { choice: string }) => {
      switch (answers.choice) {
        case "Add Student":
          inquirer.prompt(studentQuestions).then((studentData: any) => {
            const newStudent = new Student(
              studentSystem.getAllStudents().length + 1,
              studentData.name,
              studentData.age,
              studentData.grade
            );
            studentSystem.addStudent(newStudent);
            console.log("Student added successfully.");
            mainMenu();
          });
          break;
        case "Find Student":
          inquirer
            .prompt([
              {
                type: "number",
                name: "id",
                message: "Enter Student ID:",
              },
            ])
            .then((studentData: { id: number }) => {
              const foundStudent = studentSystem.findStudentById(
                studentData.id
              );
              if (foundStudent) {
                console.log("Student found:", foundStudent);
              } else {
                console.log("Student not found.");
              }
              mainMenu();
            });
          break;
        case "Remove Student":
          inquirer
            .prompt([
              {
                type: "number",
                name: "id",
                message: "Enter Student ID to remove:",
              },
            ])
            .then((studentData: { id: number }) => {
              studentSystem.removeStudent(studentData.id);
              console.log("Student removed successfully.");
              mainMenu();
            });
          break;
        case "View All Students":
          console.log("All Students:", studentSystem.getAllStudents());
          mainMenu();
          break;
        case "Exit":
          console.log("Exiting the program.");
          break;
      }
    });
};

mainMenu();
