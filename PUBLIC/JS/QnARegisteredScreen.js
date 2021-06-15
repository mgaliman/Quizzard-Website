const { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "Admin";

const socket = io();

// Join game
socket.emit('joinGame', { nickname, key });

socket.on('showAnswer', (status) => {
    window.location.href = `/game/results?key=${key}&qnum=${status}`;
});


