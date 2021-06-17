var { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "Admin";

const socket = io();

// Join game
socket.emit('joinGame', key);


// socket.on('checkConnection', (it) => {
//     it = 0;
//     socket.emit('connected', it);
// });

function nextQuestion() {
    socket.emit('showQuestion', qnum);
    window.location.href = `/game/QnARegisteredScreen?key=${key}&qnum=${+qnum + 1}`;
}


