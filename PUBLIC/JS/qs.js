const questionForm = document.getElementById('questionForm');
const { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "User";

const socket = io();

// Join game
socket.emit('joinGame', key);

socket.on('showAnswer', (status) => {
    window.location.href = `/game/results?key=${key}&qnum=${status}`;
});

socket.on('cancleGame', () => {
    window.location.href = "/game/GameWasCanceled";
});

function submit(idAnswer, maxPoints, player) {
    socket.emit('submitAnswer', idAnswer, maxPoints, player);
    window.location.href = `/game/as?key=${key}`;
};


