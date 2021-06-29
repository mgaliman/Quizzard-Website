
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
socket.on('endOfQuiz', () => {
    if (confirm("Looks like this is the end of game, cancle game?")) {
        socket.emit('cancleGame');
        window.location.href = "/registeredUser";
    }
});

function nextQuestion() {
    socket.emit('showQuestion', (qnum));
}

function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        socket.emit('cancleGame');
        window.location.href = "/registeredUser";
    }
}



