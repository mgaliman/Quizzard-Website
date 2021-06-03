
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dbop = require('./DATA/quizOperations');

const bodyParser = require('body-parser');
// var cors = require('cors');
// const { request, response } = require('express');
const app = express();
// var router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
// app.use('/index', router);

const publicDirectory = path.join(__dirname, './PUBLIC');
app.use(express.static(publicDirectory));

//Parsing URL encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parsing JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

//Define Routes
app.use('/', require('./ROUTES/pages'));
app.use('/registeredUser', require('./ROUTES/privatePages'));
app.use('/game', require('./ROUTES/gamePages'));


var port = process.env.PORT || 8091;
app.listen(port);
console.log('User API is running at ' + port);


