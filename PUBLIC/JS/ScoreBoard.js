
// Get nickname and room key from url

var { key, qnum } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io();

// Join game
socket.emit('joinGame', key);

socket.on('showQuestion', (status) => {
    window.location.href = `/game/QnARegisteredScreen?key=${key}&qnum=${status}`;
});

socket.on('cancleGame', () => {
    window.location.href = "/game/GameWasCanceled";
});

function nextQuestion() {
    socket.emit('showQuestion', qnum);
    window.location.href = `/game/QnARegisteredScreen?key=${key}&qnum=${+qnum + 1}`;
}




