
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


io.on('connection', socket => {
    socket.on('joinGame', (key) => {
        socket.join(key);
        console.log(key);
        socket.broadcast.to(key).emit('reload');
        socket.on('showQuestion', (status) => {
            status++;
            socket.broadcast.to(key).emit('showQuestion', status);
            stateChange(status, key);
        });
        socket.on('cancleGame', () => {
            gameController.cancleGame(key);
            io.to(key).emit('cancleGame');
        });
        // checkConnection(socket, key, 0);
    });
    socket.on('submitAnswer', (idAnswer, maxPoints, player) => {
        gameController.submitAnswer(idAnswer, maxPoints, player);
    });
});


var port = process.env.PORT || 8091;
server.listen(port);
console.log('User API is running at ' + port);



function stateChange(status, key) {
    setTimeout(function () {
        io.to(key).emit('showAnswer', status);
    }, 5000);
}

// function checkConnection(socket, key, it) {
//     it++;
//     socket.emit('checkConnection', it);
//     socket.on('connected', (i) => {
//         it = i;
//     });
//     if (it === 2) {
//         gameController.cancleGame(key);
//         io.to(key).emit('cancleGame');
//     }
//     setTimeout(checkConnection(socket, key, it), 5000);
// }