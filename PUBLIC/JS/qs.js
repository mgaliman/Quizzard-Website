const questionForm = document.getElementById('questionForm');
const { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "User";

const socket = io();

// Join game
socket.emit('joinGame', key);

socket.on('showAnswer', (status) => {
    window.location.href = `/game/ScoreBoard?key=${key}&qnum=${status}`;
});

socket.on('cancleGame', () => {
    window.location.href = "/game/GameWasCanceled";
});

questionForm.addEventListener('submit', e => {
    e.preventDefault();
    window.location.href = `/game/as?key=${key}`;
});


