var { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "Admin";

const socket = io();

// Join game
socket.emit('joinGame', { nickname, key });


function nextQuestion() {
    socket.emit('showQuestion', key);
    window.location.href = `/game/QnARegisteredScreen?key=${key}&qnum=${+qnum + 1}`;
}


