const nickname = "Admin";
const key = document.getElementById('gameKey').innerHTML;

const socket = io();

// Join game
socket.emit('joinGame', { nickname, key });

socket.on('reload', () => {
    location.reload();
});


function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        socket.emit('cancleGame', key);
        window.location.href = "/registeredUser/myProfile";
    }
}
function refreshList() {

    //TO DO
}
function beginQuiz() {
    socket.emit('showQuestion', key);
    window.location.href = `/game/QnARegisteredScreen?key=${key}&qnum=1`;
}
