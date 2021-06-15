
// Get nickname and room key from url

const { key } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const nickname = "User";


const socket = io();

// Join game
socket.emit('joinGame', { nickname, key });

socket.on('showAnswer', (status) => {
    window.location.href = `/game/ScoreBoard?key=${key}&qnum=${status}`;
});

