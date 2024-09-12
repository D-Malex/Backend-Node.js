// IMPORTS
const fs = require('fs');
const { BigInteger } = require("jsbn");


// FUNCTIONS & CONSTS
const ERROR_USER_EXIST = "Error: The user already exists.";
const ERROR_USER_NOT_EXIST = "Error: The user does not exist.";
const ERROR_AMOUNT_ARGUMENTS = "Error: Incorrect amount of arguments.";
const FILE = "persistences.data";
let employees=[]=Json2Array(FILE);


// FUNCTIONS & CLASSES
function Json2Array(file) {
    return(JSON.parse(fs.readFileSync(file, 'utf-8')));
}

function Array2Json(file, JSON_Array) {
    fs.writeFileSync(file, JSON_Array, 'utf-8');
}

function line(n) {console.log("-".repeat(n));}

class Person {
    constructor(name, lastname, age) {
        this.name=name;
        this.lastname=lastname;
        this.age=age;
    }
}


line(80);
console.log("Argument Reader");
for (let i = 0; i < process.argv.length; i++) console.log(`\t${i}. value: ${process.argv[i]}`);
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
            
            if(eureka) {console.log(ERROR_USER_EXIST)} else {
                employees.push(new Person(process.argv[3], process.argv[4], parseInt(process.argv[5])))
                Array2Json(FILE, JSON.stringify(employees, null, 2));
        }} else console.log(ERROR_AMOUNT_ARGUMENTS);




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

        if(eureka) console.log(ERROR_USER_NOT_EXIST);
        else Array2Json(FILE, JSON.stringify(employees, null, 2));
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
                else Array2Json(FILE, JSON.stringify(employees, null, 2)); 
            }
        } else console.log(ERROR_AMOUNT_ARGUMENTS);
}}



line(80);
console.log("Users Review\n\t[name]\t[lastname]\t[age]");
employees.forEach(employee => {
    console.log(`\t${employee.name}\t${employee.lastname}\t\t${employee.age}`);
});