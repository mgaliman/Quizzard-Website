const { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "Admin";

const socket = io();

// Join game
socket.emit('joinGame', key);

socket.on('showAnswer', (status) => {
    window.location.href = `/game/ScoreBoard?key=${key}&qnum=${status}`;
});


// socket.on('checkConnection', (it) => {
//     it = 0;
//     socket.emit('connected', it);
// });

