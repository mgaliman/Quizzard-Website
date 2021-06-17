const nickname = "Admin";
const key = document.getElementById('gameKey').innerHTML;

const socket = io();

// Join game
socket.emit('joinGame', key);

socket.on('reload', () => {
    location.reload();
});


function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        socket.emit('cancleGame');
        window.location.href = "/registeredUser/myProfile";
    }
}

// socket.on('checkConnection', (it) => {
//     it = 0;
//     socket.emit('connected', it);
// });

function refreshList() {

    //TO DO
}
function beginQuiz() {
    socket.emit('showQuestion', 1);
    window.location.href = `/game/QnARegisteredScreen?key=${key}&qnum=1`;
}
