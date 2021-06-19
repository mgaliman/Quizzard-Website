
// Get nickname and room key from url

const { nickname, key, time } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


const socket = io();

// Join game
socket.emit('joinGame', key);

socket.on('showQuestion', (status) => {
    window.location.href = `/game/qs?key=${key}&qnum=${status}&maxTime=${time}`;
});

socket.on('cancleGame', () => {
    window.location.href = "/game/GameWasCanceled";
});


