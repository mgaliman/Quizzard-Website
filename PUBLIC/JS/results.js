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

socket.on('showQuestion', (status) => {
    window.location.href = `/game/qs?key=${key}&qnum=${status}`;
});


socket.on('cancleGame', () => {
    window.location.href = "/game/GameWasCanceled";
});
