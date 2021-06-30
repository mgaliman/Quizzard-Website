const preview = document.querySelector(".preview");

function showPreview(quizID) {
    var quiz = document.getElementById(quizID);
    var quizName = quiz.className;
    var quizQuesitons = quiz.children;
    var questions = [];
    Array.from(quizQuesitons).forEach(question => {
        var questionText = question.className;
        var answers = question.children;
        var myAnswers = [];
        for (const answer of answers) {
            myAnswers.push({ text: answer.innerHTML });
        }
        questions.push({ text: questionText, answers: myAnswers });
    })
    var myQuiz = ({ name: quizName, questions: questions });
    preview.innerHTML = `<div class="quizName">
    <h1 translate="no">${myQuiz.name}</h1>
    </div>
    `;
    myQuiz.questions.forEach(async (question, index) => {
        preview.innerHTML += `<div class="question-Container">
                    <h2 translate="no">${question.text}</h2>
                    <div class="answer-container">`;
        await question.answers.forEach((answer, index) => {
            switch (index) {
                case 0:
                    preview.innerHTML += `<div class="answer${index} ans"><img src="/IMAGES/0.png" alt="#" translate="no" width="60px">
                                <h3 translate="no">${answer.text}</h3>
                                </div>`;
                    break;
                case 1:
                    preview.innerHTML += `<div class="answer${index} ans"><img src="/IMAGES/1.png" alt="#" translate="no" width="60px">
                                <h3 translate="no">${answer.text}</h3>
                                </div>`;
                    break;
                case 2:
                    preview.innerHTML += `<div class="answer${index} ans"><img src="/IMAGES/2.png" alt="#" translate="no" width="60px">
                                <h3 translate="no">${answer.text}</h3>
                                </div>`;
                    break;
                case 3:
                    preview.innerHTML += `<div class="answer${index} ans"><img src="/IMAGES/3.png" alt="#" translate="no" width="60px">
                                <h3 translate="no">${answer.text}</h3>
                                </div>`;
                    break;
                default:
                    break;
            }
        });
        preview.innerHTML += `</div>`;
    });

    preview.innerHTML += `</div>
                            <div class="btn-group myGroup" role="group" aria-label="Basic mixed styles example" style="margin: 0 30%;">
                            <a href="/game/joiningScreen?ID=${quizID}">
                            <button type="button" class="btn btn-primary">Play</button>
                            </a>
                            <a href="/registeredUser/createAQuiz?name=${quizID}">
                            <button type="button" class="btn btn-info">Update</button>
                            </a>
                            <a href="/registeredUser/myProfile/deleteQuiz?id=${quizID}"><button type="button"
                            class="btn btn-danger" style="background: #c04595;">Delete</button></a>
                            </div>`;
    preview.style.display = 'block';
}
function hidePreview() {
    preview.style.display = "none";
    preview.innerHTML = "";
}
