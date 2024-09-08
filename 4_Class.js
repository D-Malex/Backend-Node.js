
class Person {
    constructor(name, lastname, age) {
        this.name=name;
        this.lastname=lastname;
        this.age=age;
}}

let employees = [
    new Person("Juan", "Sanchez", 55),
    new Person("Sancho", "Panza", 22),
    new Person("John", "Connor", 16),
    new Person("Kyle", "Reese", 25)
];


console.log("\nArgument Reader");
for (let i = 0; i < process.argv.length; i++) console.log(`   ${i}. value: ${process.argv[i]}`);
console.log("\n");


/*------------------------------------ Process Area ------------------------------------*/

if(process.argv.length > 1) {
    let eureka = false;

    // CREATE <userName> <userLastname> <age>
    if(process.argv[2] === "CREATE") {
        // Validate arguments
        if(process.argv.length === 6) {
            // Validate user existence 
            employees.forEach(employee => {
                if(process.argv[3] === employee.name && process.argv[4] === employee.lastname &&  employee.age.toString() === process.argv[5]) {
                    eureka = true;  
                }
            });

            if(!eureka) {
                employees.push(new Person(process.argv[3], process.argv[4], process.argv[5]));
            } else {
                console.log(`Error: The user already exists.`);
            }
            
        } else {
            console.log(`Error: Incorrect amount of arguments.`);
        }    
    
    
    } else if(process.argv[2] === "READ") {
        // READ
        // Validate arguments
        if(process.argv.length === 4) {
            if(process.argv[3] === "ALL") {
                employees.forEach(employee => {
                    console.log(`   ${employee.name} ${employee.lastname} ${employee.age}`);
                });
            } else {
                // Validate user existence
                employees.forEach(employee => {
                    if(process.argv[3] === employee.name) {
                        console.log(`   ${employee.name} ${employee.lastname} ${employee.age}`);
                        eureka = true;
                    }
                });

                if(!eureka) {
                    console.log(`Error: The user does not exist.`);
                }
            }
        } else {
            console.log(`Error: Incorrect amount of arguments.`);
        }
        

    } else if(process.argv[2] === "UPDATE") {
        // UPDATE
        // Validate arguments
        if(process.argv.length === 7) {
            // Validate user existence
            employees.forEach(employee => {
                if(process.argv[3] === employee.name) {
                    employee.name = process.argv[4];
                    employee.lastname = process.argv[5];
                    employee.age = process.argv[6];
                    eureka = true;
                }
            });

            if(!eureka) {
                console.log(`Error: The user does not exist.`);
            }


        } else {
            console.log(`Error: Incorrect amount of arguments.`);
        }


    } else if(process.argv[2] === "DELETE") {
        // DELETE
        // Validate arguments
        if(process.argv.length === 4) {
            if(process.argv[3] === "ALL") {
                while(employees.length > 0) { 
                    employees.pop();
                }
            } else {
                // Validate user existence
                employees.forEach(employee => {
                    if(process.argv[3] === employee.name) {
                        employees.splice(employees.indexOf(employee), 1);
                        eureka = true;
                    }
                });
                if(!eureka) {
                    console.log(`Error: The user does not exist.`);
                }
            }
        } else {
            console.log(`Error: Incorrect amount of arguments.`);
        }
    }
}

/*------------------------------------ Process Area ------------------------------------*/



/*------------------------------------ Review ------------------------------------*/
console.log(`\nUsers Review`);
employees.forEach(employee => {
    console.log(`   ${employee.name}   ${employee.lastname}    ${employee.age}`);
});
/*------------------------------------ Review ------------------------------------*/