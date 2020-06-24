const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./mongoose-models/setup');

let error;
let user;

app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json 
app.use(bodyParser.json());

// use cookie parser 
app.use(cookieParser());

const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Render HTML
app.get('/', (req, res) => {
    res.render('index', { title: 'doantinhoc' });
})

app.get('/sign-in', (req, res) => {
    res.render('sign-in', { title: 'doantinhoc' });
})

app.get('/sign-up', (req, res) => {
    res.render('sign-up', { title: 'doantinhoc' });
})

const { EmployeeModel } = require('./mongoose-models')

//     // function(err, connection) {
//     //     console.log('here')
//     //   if (err) {
//     //       error = err; 
//     //       console.log(error);
//     //       return;
//     //     }

//     //     console.log('connected to db')

//     //   connection.execute(`INSERT INTO USERS
//     //   (USERNAME, PASSWORD)
//     //   VALUES
//     //   (${username}, ${password});`, [], function(err, result) {
//     //     if (err) {
//     //         error = err; 
//     //         console.log(error);
//     //         return;
//     //     }

//     //     console.log(result)

//     //     connection.close(function(err) {
//     //       if (err) {console.log(err);}
//     //     });
//     //   })
//     // }
// );


// APIs

app.post('/api/sign-up', async (req, res) => {
    const { email, name, phoneNumber, password, address } = req.body;

    // Add into database
    const employee = await EmployeeModel.create({
        email, name, phoneNumber, password, address
    })

    res.json(employee)
})

app.post('/api/sign-in', async (req, res) => {
    const { email, password } = req.body;

    // Add into database
    const employee = await EmployeeModel.findOne({
        email, password
    })

    if (employee) {
        res.json({
            isSuccess: true, 
            employee,
        })
        return
    } else {
        res.json({
            isSuccess: false, 
        })
        return
    }

})






// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

app.listen(port);

console.log('Server is running on port ', port)