
const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
var gameController = require('./CONTROLLERS/game');
const { stat } = require('fs');

// var cors = require('cors');
// const { request, response } = require('express');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

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


var status = 0;
io.on('connection', socket => {
    socket.on('joinGame', ({ nickname, key }) => {
        socket.join(key);
        console.log(key);
        socket.broadcast.to(key).emit('reload');
        socket.on('showQuestion', (key) => {
            status++;
            socket.broadcast.to(key).emit('showQuestion', status);
            stateChange(status);
            function stateChange(status) {
                setTimeout(function () {
                    socket.emit('showAnswer', status);
                    socket.broadcast.to(key).emit('showAnswer', status);
                    status++;
                    console.log("dedhefnsnfj")
                }, 5000);
            }
        });
        socket.on('cancleGame', () => {
            gameController.cancleGame(key);
            io.to(key).emit('cancleGame');
        });
    });
});


var port = process.env.PORT || 8091;
server.listen(port);
console.log('User API is running at ' + port);


