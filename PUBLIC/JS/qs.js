const questionForm = document.getElementById('questionForm');
const { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "User";

const socket = io();

// Join game
socket.emit('joinGame', { nickname, key });

socket.on('showAnswer', (status) => {
    window.location.href = `/game/ScoreBoard?key=${key}&qnum=${status}`;
});

questionForm.addEventListener('submit', e => {
    e.preventDefault();

    window.location.href = `/game/as?key=${key}`;

});


