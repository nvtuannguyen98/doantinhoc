const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const oracledb = require('oracledb');
let error;
let user;

app.use(express.static("public"));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:true}));

// parse application/json 
app.use(bodyParser.json());

// use cookie parser 
app.use(cookieParser());

const hostname = '127.0.0.1'; // localhost
const port = 3000;

app.get('/', (req, res)=> {
    res.render('index', {title: 'đồ án tin học'});
})

app.get('/login.html', (req, res)=> {
    res.render('login', {title: 'đồ án tin học'});
})

oracledb.getConnection(
    {
      user: 'trinh', 
      password: '12345678',
      connectString: "Data Source=xe;User Id=trinh;Password=12345678;" // error
    }, 
    function(err, connection) {
        console.log('here')
      if (err) {
          error = err; 
          console.log(error);
          return;
        }

        console.log('connected to db')
      
      connection.execute(`INSERT INTO USERS
      (USERNAME, PASSWORD)
      VALUES
      (${username}, ${password});`, [], function(err, result) {
        if (err) {
            error = err; 
            console.log(error);
            return;
        }
 
        console.log(result)
 
        connection.close(function(err) {
          if (err) {console.log(err);}
        });
      })
    }
);

app.post('/api/sign-up', (req, res)=> {
    const {username, password} = req.body;
    console.log(username, password)
    
})


 




// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

app.listen(port);