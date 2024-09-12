// IMPORTS
const fs = require('fs');
const net = require('net');


// CONSTANTS & VARIABLES
const ERROR_USER_EXIST = `Error: The user already exists.`;
const ERROR_USER_NOT_EXIST = `Error: The user does not exist.`;
const ERROR_AMOUNT_ARGUMENTS = `Error: Incorrect amount of arguments.`;
const ERROR_REQUEST = `Error: Incorrect request.`;
const ERROR_SAVE_FILE = `Error: The file is not saved.`;
const SUCCESS_SAVE_FILE = `Success: The file is saved.`;
const SUCCESS_ALL_USERS_DELETED = `Success: All users are deleted.`;
const FILE = "persistences.data";
let employees = [] = reload(FILE);
let port = 7777;


// CLASS
class Person {
    constructor(name, lastname, age) {
        this.name=name;
        this.lastname=lastname;
        this.age=age;
    }
}


// FUNCTIONS
// json2Array
function reload(file) {                             
    data = fs.readFileSync(file, 'utf-8');
    return(JSON.parse(data));
}

// Array2Json
function save(file, JSONArray) {
    fs.writeFileSync(file, JSONArray, 'utf-8');
}

function userExist(...args) {
    let eureka = false;

    if(args.length === 1) {
        employees.forEach(employee => {
            if(args[0] === employee.name) eureka = true;
        });
        return eureka;

    } else if (args.length === 3) {
        employees.forEach(employee => {
            if(employee.name === args[0] && employee.lastname === args[1] && employee.age === args[2]) eureka = true;
        });
        return eureka;
    }
}

function sizeRequest(number, params) {
    return (params.length === number? true : false);
}

function deleteAll() {
    while(employees.length > 0) employees.pop();
}



function processRequests(args) {
    switch (args[2]) {
        case "CREATE":
            if(!sizeRequest(6, args)) {
                console.log(ERROR_AMOUNT_ARGUMENTS);
                return ERROR_AMOUNT_ARGUMENTS;
            } else if(userExist(args[3], args[4], parseInt(args[5]))) {
                console.log(ERROR_USER_EXIST);
                return ERROR_USER_EXIST;
            } else {
                employees.push(new Person(args[3], args[4], parseInt(args[5])))
                try {
                    save(FILE, JSON.stringify(employees, null, 2));
                    console.log(SUCCESS_SAVE_FILE);
                    return SUCCESS_SAVE_FILE;
                }catch(e){
                    console.log(ERROR_SAVE_FILE+"\n"+e);
                    return ERROR_SAVE_FILE+"\n"+e;
                }
            }


        case "READ":
            if(!sizeRequest(4, args)) {
                console.log(ERROR_AMOUNT_ARGUMENTS);
                return ERROR_AMOUNT_ARGUMENTS;
            } else if(args[3] === "ALL") {
                let res="";
                employees.forEach(employee => {
                    console.log(`${employee.name}\t${employee.lastname}\t\t${employee.age}`);
                    res+=`${employee.name}\t${employee.lastname}\t\t${employee.age}\n`;
                });
                return res;
            } else if(!userExist(args[3])) {
                console.log(ERROR_USER_NOT_EXIST);
                return ERROR_USER_NOT_EXIST;
            } else {
                let res=``;
                employees.forEach(employee => {
                    if(employee.name === args[3]) {
                        console.log(`${employee.name}\t${employee.lastname}\t\t${employee.age}`);
                        res+=(`${employee.name}\t${employee.lastname}\t\t${employee.age}\n`);
                    }
                });
                return res;}
    


        case "UPDATE":
            if(!sizeRequest(7, args)) {
                console.log(ERROR_AMOUNT_ARGUMENTS);
                return ERROR_AMOUNT_ARGUMENTS;
            } else if(!userExist(args[3])) {
                console.log(ERROR_USER_NOT_EXIST);
                return ERROR_USER_NOT_EXIST;
            } else {
                employees.forEach(employee => {
                    if(employee.name === args[3]) {
                        employee.name = args[4]; 
                        employee.lastname = args[5];
                        employee.age = parseInt(args[6]);
                    }})
                    try {
                        save(FILE, JSON.stringify(employees, null, 2));
                        console.log(SUCCESS_SAVE_FILE);
                        return SUCCESS_SAVE_FILE;
                    }catch(e){
                        console.log(ERROR_SAVE_FILE+"\n"+e);
                        return ERROR_SAVE_FILE+"\n"+e;
            }}
    
    
        case "DELETE":
            if(sizeRequest(4, args)) {
                if(args[3] === "ALL") {
                    deleteAll();
                    console.log(SUCCESS_ALL_USERS_DELETED);
                    return SUCCESS_ALL_USERS_DELETED;
                } else {
                    console.log(ERROR_AMOUNT_ARGUMENTS);
                    return ERROR_AMOUNT_ARGUMENTS;
                }
            } else if(!sizeRequest(6, args)) {
                console.log(ERROR_AMOUNT_ARGUMENTS);
                return ERROR_AMOUNT_ARGUMENTS;
            } else if(!userExist(args[3], args[4], parseInt(args[5]))) {
                console.log(ERROR_USER_NOT_EXIST);
                return ERROR_USER_NOT_EXIST;
            } else {
                employees.forEach(employee => {
                    if (employee.name === args[3] && 
                        employee.lastname === args[4] && 
                        employee.age === parseInt(args[5])) 
                    employees.splice(employees.indexOf(employee), 1);
                });
                try {
                    save(FILE, JSON.stringify(employees, null, 2));
                    console.log(SUCCESS_SAVE_FILE);
                    return SUCCESS_SAVE_FILE;
                }catch(e){
                    console.log(ERROR_SAVE_FILE+"\n"+e);
                    return ERROR_SAVE_FILE+"\n"+e;
            }}


        default:
            console.log(ERROR_REQUEST);
            return ERROR_REQUEST;
}}



// SERVER 
let server = net.createServer((socket) => {
    socket.write("Welcome to the server\n");

    socket.on('data', function(data) {
        let strData = data.toString();
        let requestPart = strData.split(" ");
        requestPart[requestPart.length - 1] = (requestPart[requestPart.length - 1]).trim();
        let requestPartModified = ["Compense the node executable","Compense the programm name"];
        requestPartModified = requestPartModified.concat(requestPart);

        let aReturn = processRequests(requestPartModified); 
        if(aReturn) {
            socket.write(aReturn + "\n\n");
        }
        
    })
});

server.listen(port);
console.log(`The server is running at the port: ${port}`);