var questionNum = 0;


function generateID(){
    //ID generator
    var randomstring = Math.random().toString(36).slice(-8);
    // Generate random number, eg: 0.123456
    // Convert  to base-36 : "0.4fzyo82mvyr"
    // Cut off last 8 characters : "yo82mvyr"

    var idInput=document.getElementById("quizInputID");
    idInput.value=randomstring;
}

function addQuestion() {
    questionNum += 1;

    var questionsDiv = document.getElementById('allQuestions');

    var newQuestionDiv = document.createElement("div");
    newQuestionDiv.setAttribute('id', 'question-field');    //Sets class of div
    newQuestionDiv.setAttribute('class', 'animated bounceInLeft');

    var deleteButton = document.createElement('button');      //Delete button
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.setAttribute('onclick', 'deleteQuestion()');
    deleteButton.innerHTML = "Delete question " + String(questionNum);

    var newAnswersDiv = document.createElement("div");      //ANSWERS GRID
    newAnswersDiv.setAttribute('id', 'answer-field');
    newAnswersDiv.setAttribute('class', 'animated zoomIn');

    var chooseDiv = document.createElement("div");      //CHOOSE NUMBER DIV
    chooseDiv.setAttribute('id', 'chooseDiv');

    var answerNumberLabel = document.createElement('label');
    answerNumberLabel.setAttribute('class', 'answerNumberLabel');
    answerNumberLabel.innerHTML = "Choose the number of answers:";

    var twoAnswers = document.createElement('button');
    twoAnswers.setAttribute('id', 'twoAnsr');
    twoAnswers.innerHTML = "2";

    var fourAnswers = document.createElement('button');
    fourAnswers.setAttribute('id', 'fourAnsr');
    fourAnswers.innerHTML = "4";

    var questionField = document.createElement('textarea');
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('placeholder', 'Enter a question here...');

    var cardFooter = document.createElement('div');           //CARD FOOTER
    cardFooter.setAttribute('class', 'cardFooter');
    var correctLabel = document.createElement('label');
    var correctField = document.createElement('input');
    correctField.setAttribute('onkeydown', 'return false');
    var minVal = 1;
    var maxVal;

    newQuestionDiv.appendChild(deleteButton);
    newQuestionDiv.appendChild(questionField);

    chooseDiv.appendChild(answerNumberLabel);
    chooseDiv.appendChild(twoAnswers);
    chooseDiv.appendChild(fourAnswers);
    newQuestionDiv.appendChild(chooseDiv);

    questionsDiv.appendChild(document.createElement('br'));     //Creates a break between each question
    questionsDiv.appendChild(newQuestionDiv);                   //Adds the question div to the screen


    $('#twoAnsr, #fourAnsr').click(function () {

        $('#twoAnsr, #fourAnsr').prop('disabled', true);

        if (this.id == 'twoAnsr') {

            maxVal = 2;
            correctLabel.innerHTML = "Correct Answer (1/2): ";

            var answer1Field = document.createElement('textarea');
            answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
            answer1Field.setAttribute('class', 'answers');
            answer1Field.setAttribute('style', 'background-color:#C04595');

            var answer2Field = document.createElement('textarea');
            answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
            answer2Field.setAttribute('class', 'answers');
            answer2Field.setAttribute('style', 'background-color:#45C070');

            answer1Field.setAttribute('id', String(questionNum) + "a1");
            answer1Field.setAttribute('type', 'text');
            answer2Field.setAttribute('id', String(questionNum) + "a2");
            answer2Field.setAttribute('type', 'text');

            newAnswersDiv.appendChild(answer1Field);
            newAnswersDiv.appendChild(answer2Field);
            newQuestionDiv.appendChild(newAnswersDiv);
        }
        else if (this.id == 'fourAnsr') {

            maxVal = 4;
            correctLabel.innerHTML = "Correct Answer (1-4): ";

            var answer1Field = document.createElement('textarea');
            answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
            answer1Field.setAttribute('class', 'answers');
            answer1Field.setAttribute('style', 'background-color:#C04595');

            var answer2Field = document.createElement('textarea');
            answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
            answer2Field.setAttribute('class', 'answers');
            answer2Field.setAttribute('style', 'background-color:#45C070');

            var answer3Field = document.createElement('textarea');
            answer3Field.setAttribute('placeholder', 'Enter the third answer here...');
            answer3Field.setAttribute('class', 'answers');
            answer3Field.setAttribute('style', 'background-color:#C0AD45');

            var answer4Field = document.createElement('textarea');
            answer4Field.setAttribute('placeholder', 'Enter the fourth answer here...');
            answer4Field.setAttribute('class', 'answers');
            answer4Field.setAttribute('style', 'background-color:#4558C0');

            answer1Field.setAttribute('id', String(questionNum) + "a1");
            answer1Field.setAttribute('type', 'text');
            answer2Field.setAttribute('id', String(questionNum) + "a2");
            answer2Field.setAttribute('type', 'text');
            answer3Field.setAttribute('id', String(questionNum) + "a3");
            answer3Field.setAttribute('type', 'text');
            answer4Field.setAttribute('id', String(questionNum) + "a4");
            answer4Field.setAttribute('type', 'text');

            newAnswersDiv.appendChild(answer1Field);
            newAnswersDiv.appendChild(answer2Field);
            newAnswersDiv.appendChild(answer3Field);
            newAnswersDiv.appendChild(answer4Field);
            newQuestionDiv.appendChild(newAnswersDiv);

        }

        correctField.setAttribute('id', 'correct' + String(questionNum));
        correctField.setAttribute('type', 'number');
        correctField.setAttribute('min', String(minVal));
        correctField.setAttribute('max', String(maxVal));

        cardFooter.appendChild(correctLabel);
        cardFooter.appendChild(correctField);
        newQuestionDiv.appendChild(cardFooter);
    });
    questionsDiv.appendChild(newQuestionDiv);                   //Adds the question div to the screen

    newQuestionDiv.style.backgroundColor = randomColor();
}

function deleteQuestion() {
    questionNum -= 1;
}

function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "../HTML/myProfile.html";
    }
}

// socket.on('startGameFromCreator', function(data){
//     window.location.href = "../../host/?id=" + data;
// });

function randomColor() {

    var colors = ['#EBCEED', '#D3F1D2', '#FEECD6', '#C1E1E2'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

// function setBGColor() {
//     var randColor1 = randomColor();
//     var randColor2 = randomColor();
//     document.getElementById('question-field').style.backgroundImage = "linear-gradient(200deg, " + String(randColor1) + ", " + String(randColor2) + ")";
// }