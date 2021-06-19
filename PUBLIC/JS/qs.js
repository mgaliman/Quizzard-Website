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
const maxTime = document.getElementById('maxTime').innerHTML;
function submit(idAnswer, maxPoints, player) {
    var time = document.getElementById("countdown").innerHTML;
    var points = 0;
    points = getPoints(maxPoints, time, maxTime);
    socket.emit('submitAnswer', idAnswer, points, player);
    // window.location.href = `/game/as?key=${key}`;
};

function getPoints(maxPoints, time, maxTime) {
    return (1 - time / maxTime / 2) * maxPoints;
}
