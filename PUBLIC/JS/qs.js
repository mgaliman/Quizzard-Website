const questionForm = document.getElementById('questionForm');
const maxTime = document.getElementById('maxTime').innerHTML;

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

socket.on('returnIsTrue', (isTrue) => {
    window.location.href = `/game/as?key=${key}&isTrue=${isTrue}`;
})

function submit(idAnswer, maxPoints, player) {
    var time = document.getElementById("countdown").innerHTML;
    var points = 0;
    points = getPoints(maxPoints, time, maxTime);
    socket.emit('submitAnswer', idAnswer, points, player);
};

function getPoints(maxPoints, time, maxTime) {
    return maxPoints;
    // return (1 - (time / maxTime / 2)) * maxPoints;
}
