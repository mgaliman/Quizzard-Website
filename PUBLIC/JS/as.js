
// Get nickname and room key from url

const { key, ans } = Qs.parse(location.search, {
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

