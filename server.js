const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded());

//Serves the index.html file as a simple webpage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//addition operation
const addition = (num1, num2) => num1 + num2;

//subtraction operation
const subtraction = (num1, num2) => num1 - num2;

//division operation
const division = (num1, num2) => num1 / num2;

//multiplication operation
const multiplication = (num1, num2) => num1 * num2;

//exponential operation
const exponentiation = (num1, num2) => num1 ** num2;

//modulus operation
const modulus = (num1, num2) => num1 % num2;

//squareroot operation
const squareroot = (num1) => Math.sqrt(num1);

function handleOperation (res, req, operation, requiresTwoNumbers) {
    
    try{
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        
        if (isNaN(num1)){
            res.status(400).send('Error: input one is not a number!');
            throw new Error('Input one is not a number!');
        }
        if (requiresTwoNumbers && isNaN(num2)){
            res.status(400).send('Error: input two is not a number!');
            throw new Error('Input two is not a number!');
        }       

        switch (operation) {
            case 'add':
                return res.status(200).send(num1  + " + "  +  num2 + " = " + addition(num1, num2));
            case 'subtract':
                return res.status(200).send(num1  + " - "  +  num2 + " = " + subtraction(num1, num2));
            case 'divide':
                return res.status(200).send(num1  + " / "  +  num2 + " = " + division(num1, num2));
            case 'multiply':
                return res.status(200).send(num1  + " * "  +  num2 + " = " + multiplication(num1, num2));
            case 'exponent':
                return res.status(200).send(num1  + " ^ "  +  num2 + " = " + exponentiation(num1, num2));
            case 'mod':
                return res.status(200).sendnum1  + " % "  +  num2 + " = " + (modulus(num1, num2));
            case 'squareroot':
                return res.status(200).send('Squareroot of ' + num1 + " = " + squareroot(num1));
            default:
                return 'Invalid operation';
        }

    }
    catch(error){
        res.status(500).send(`Unknwon server error. Error: ${error}`);
    }    
}

//API endpoint for addition with two numbers
app.get('/add', (req, res) => handleOperation (res, req, 'add', true));       

//API endpoint for subtraction with two numbers
app.get('/subtract', (req, res) => handleOperation (res, req, 'subtract', true)); 

//API endpoint for division with two numbers
app.get('/divide', (req, res) => handleOperation (res, req, 'divide', true));

//API endpoint for multiplication with two numbers
app.get('/multiply', (req, res) => handleOperation (res, req, 'multiply', true));

//API endpoint for multiplication with two numbers
app.get('/exponent', (req, res) => handleOperation (res, req, 'exponent', true));

//API endpoint for modulo with two numbers
app.get('/mod', (req, res) => handleOperation (res, req, 'mod', true));

//API endpoint for squareroot of a number
app.get('/squareroot', (req, res) => handleOperation (res, req, 'squareroot', false));




//Starts the Express Server listening on port 8080
app.listen(port, () => {
    console.log(`Calculator Microservice Listening On Port http://localhost:${port}`);    
});