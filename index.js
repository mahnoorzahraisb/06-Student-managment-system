#! /usr/bin/env node
import inquirer from "inquirer";
// initializing student class
class Student {
    // constructor to add values of objects
    constructor(name) {
        this.rollNumber = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 70000;
    }
    // creating method to add courses
    enroll_course(course) {
        this.courses.push(course);
    }
    // method to view balance
    view_balance() {
        console.log(`Balance for ${this.name}: ${this.balance}`);
    }
    // method to pay student fees 
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`${amount} Fees paid successfully for ${this.name}`);
    }
    // method to display student information
    show_info() {
        console.log(`Roll Number: ${this.rollNumber}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses Enrolled: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
Student.counter = 1234;
// management class 
class StudentManage {
    constructor() {
        this.students = [];
    }
    // method to add the new student 
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. `);
        console.log(`Roll Number: ${student.rollNumber}`);
    }
    // method to enroll new student
    enroll_student(student_rollNumber, course) {
        let student = this.find_student(student_rollNumber);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    // method to view balance
    view_student_balance(student_rollNumber) {
        let student = this.find_student(student_rollNumber);
        if (student !== undefined) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please enter correct Roll Number");
        }
    }
    pay_studentFees(student_rollNumber, amount) {
        let student = this.find_student(student_rollNumber);
        if (student !== undefined) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter correct Roll Number");
        }
    }
    show_studentStatus(student_rollNumber) {
        let student = this.find_student(student_rollNumber);
        if (student !== undefined) {
            student.show_info();
        }
        else {
            console.log("Student not found. Please enter correct Roll Number");
        }
    }
    // method find student 
    find_student(student_rollNumber) {
        return this.students.find(std => std.rollNumber === student_rollNumber);
    }
}
async function main() {
    console.log(" Welcome To Student Manage System ");
    console.log("=".repeat(60));
    let studentManage = new StudentManage();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select any option",
                choices: ["Add student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Info", "Exit"]
            }
        ]);
        // Using switch - case statement 
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter the name of student: "
                    }
                ]);
                studentManage.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter the Roll number of student"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter the Course you want to enroll: "
                    }
                ]);
                studentManage.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student Roll Number: "
                    }
                ]);
                studentManage.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: " Enter the Student Roll Number"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay: "
                    }
                ]);
                studentManage.pay_studentFees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Info":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student Roll Number"
                    }
                ]);
                studentManage.show_studentStatus(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting......");
                process.exit();
        }
    }
}
main();
