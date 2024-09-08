// FUNCTIONS & CONSTS
const { BigInteger } = require("jsbn");
const ERROR_USER_EXIST = "Error: The user already exists.";
const ERROR_USER_NOT_EXIST = "Error: The user does not exist.";
const ERROR_AMOUNT_ARGUMENTS = "Error: Incorrect amount of arguments.";

let employees = [
    new Person("Juan", "Sanchez", 55),
    new Person("Sancho", "Panza", 22),
    new Person("John", "Connor", 16),
    new Person("Kyle", "Reese", 25)
];

function line(n) {console.log("-".repeat(n));}


// CLASS
class Person {
    constructor(name, lastname, age) {
        this.name=name;
        this.lastname=lastname;
        this.age=age;
}}


line(80);
console.log("Argument Reader");
for (let i = 0; i < process.argv.length; i++) console.log(`   ${i}. value: ${process.argv[i]}`);
console.log("\n");



if(process.argv.length > 1) {
    let eureka = false;

    // CREATE <userName> <userLastname> <age>
    if(process.argv[2] === "CREATE") {
        
        // Validate arguments
        if(process.argv.length === 6) {
            
            // Validate user existence 
            employees.forEach(employee => {
                if (process.argv[3] === employee.name && 
                    process.argv[4] === employee.lastname && 
                    process.argv[5] === employee.age.toString()) 
                {eureka = true;}
            });
            
            (eureka?
                console.log(ERROR_USER_EXIST) :
                employees.push(new Person(process.argv[3], process.argv[4], parseInt(process.argv[5]))))
            
        } else console.log(ERROR_AMOUNT_ARGUMENTS);
    
    
    // READ
    } else if(process.argv[2] === "READ") {
        
        // Validate arguments
        if(process.argv.length === 4) {
            
            // READ ALL
            if(process.argv[3] === "ALL") {
                console.log("[name]\t[lastname]\t[age]");
                employees.forEach(employee => 
                    {console.log(`${employee.name}\t${employee.lastname}\t\t${employee.age}`);});

            } else {
                // READ <name>
                // Validate user existence
                employees.forEach(employee => {
                    if (process.argv[3] === employee.name) {
                        console.log(`\t${employee.name}\t${employee.lastname}\t\t${employee.age}`);
                        eureka = true;
                }});

                if(!eureka) console.log(ERROR_USER_NOT_EXIST)
            }
        } else console.log(ERROR_AMOUNT_ARGUMENTS);


    // UPDATE <name> <new-name> <new-lastname> <new-age>
    } else if(process.argv[2] === "UPDATE") {
        
        // Validate arguments
        if(process.argv.length === 7) {
            
            // Validate user existence
            employees.forEach(employee => {
                if (employee.name === process.argv[3]) {
                    employee.name = process.argv[4];
                    employee.lastname = process.argv[5];
                    employee.age = process.argv[6];
                    eureka = true;
            }});

            if(!eureka) console.log(ERROR_USER_NOT_EXIST);
        } else console.log(ERROR_AMOUNT_ARGUMENTS);


    // DELETE
    } else if(process.argv[2] === "DELETE") {

        // Validate arguments
        if(process.argv.length === 4) {
            if(process.argv[3] === "ALL") {while(employees.length > 0) employees.pop();} 
            else {

                // Validate user existence
                employees.forEach(employee => {
                    if(process.argv[3] === employee.name) {
                        employees.splice(employees.indexOf(employee), 1);
                        eureka = true;
                }});
                if(!eureka) console.log(ERROR_USER_NOT_EXIST);
            }
        } else console.log(ERROR_AMOUNT_ARGUMENTS);
}}


line(80);
console.log("Users Review\n\t[name]\t[lastname]\t[age]");
employees.forEach(employee => {
    console.log(`\t${employee.name}\t${employee.lastname}\t\t${employee.age}`);
});