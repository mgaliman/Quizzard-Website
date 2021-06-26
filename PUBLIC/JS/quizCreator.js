var questionNum = document.querySelectorAll('.question-field').length;
console.log(questionNum);

$(document).ready(function () {
    $('#saveBtn').attr('disabled', true);

    $('.myField input').keyup(function () {
        if ($('.myField input') != 0) {
            $('#saveBtn').attr('disabled', false);
        }
    })

});

function addQuestion() {

    var questionsDiv = document.getElementById('allQuestions');

    var newQuestionDiv = document.createElement("div");
    newQuestionDiv.setAttribute('class', 'animated bounceInLeft question-field');
    newQuestionDiv.setAttribute('name', 'questionCard' + String(questionNum));

    var deleteButton = document.createElement('button');      //Delete button
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.setAttribute('type', 'button');
    deleteButton.innerHTML = "Delete question ";

    var timerInput = document.createElement('input');      //TIMER
    timerInput.setAttribute('class', 'timer');
    timerInput.setAttribute('name', `questions[${String(questionNum)}][timer]`);
    timerInput.setAttribute('type', 'number');
    timerInput.setAttribute('min', '1');
    timerInput.setAttribute('onkeydown', 'return false');

    var lblTimer = document.createElement('label');
    lblTimer.setAttribute('class', 'lblTimer');
    lblTimer.innerHTML = "Timer:"

    var newAnswersDiv = document.createElement("div");      //ANSWERS GRID
    newAnswersDiv.setAttribute('class', 'animated zoomIn answer-field');

    var chooseDiv = document.createElement("div");      //CHOOSE NUMBER DIV
    chooseDiv.setAttribute('id', 'chooseDiv');

    var answerNumberLabel = document.createElement('label');
    answerNumberLabel.setAttribute('class', 'answerNumberLabel');
    answerNumberLabel.innerHTML = "Choose the number of answers:";

    var twoAnswers = document.createElement('button');
    twoAnswers.setAttribute('id', 'twoAnsr_' + String(questionNum));
    twoAnswers.setAttribute('type', 'button');
    twoAnswers.innerHTML = "2";

    var fourAnswers = document.createElement('button');
    fourAnswers.setAttribute('id', 'fourAnsr_' + String(questionNum));
    fourAnswers.setAttribute('type', 'button');
    fourAnswers.innerHTML = "4";

    var questionField = document.createElement('textarea');
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('name', `questions[${String(questionNum)}][text]`);
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

    newQuestionDiv.appendChild(lblTimer);
    newQuestionDiv.appendChild(timerInput);

    chooseDiv.appendChild(answerNumberLabel);
    chooseDiv.appendChild(twoAnswers);
    chooseDiv.appendChild(fourAnswers);
    newQuestionDiv.appendChild(chooseDiv);

    questionsDiv.appendChild(newQuestionDiv);                   //Adds the question div to the screen


    $(`#twoAnsr_${String(questionNum)}`).click(function () {
        $(newAnswersDiv).empty();

        maxVal = 2;
        correctLabel.innerHTML = "Correct Answer (1/2): ";

        var answer1Field = document.createElement('input');
        answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
        answer1Field.setAttribute('class', 'answers');
        answer1Field.setAttribute('style', 'background-color:rgba( 118, 213, 152, 0.50 )');

        var answer2Field = document.createElement('input');
        answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
        answer2Field.setAttribute('class', 'answers');
        answer2Field.setAttribute('style', 'background-color:rgba( 218, 90, 251, 0.50 )');

        answer1Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][0][text]`);
        answer1Field.setAttribute('type', 'text');
        answer2Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][1][text]`);
        answer2Field.setAttribute('type', 'text');

        newAnswersDiv.appendChild(answer1Field);
        newAnswersDiv.appendChild(answer2Field);
        newQuestionDiv.appendChild(newAnswersDiv);

        correctField.setAttribute('name', `questions[${this.id.split('_')[1]}][correctAnswer]`);
        correctField.setAttribute('type', 'number');
        correctField.setAttribute('min', String(minVal));
        correctField.setAttribute('max', String(maxVal));

        cardFooter.appendChild(correctLabel);
        cardFooter.appendChild(correctField);
        newQuestionDiv.appendChild(cardFooter);
    });

    $(`#fourAnsr_${String(questionNum)}`).click(function () {

        $(newAnswersDiv).empty();
        maxVal = 4;
        correctLabel.innerHTML = "Correct Answer (1-4): ";

        var answer1Field = document.createElement('input');
        answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
        answer1Field.setAttribute('class', 'answers');
        answer1Field.setAttribute('style', 'background-color:rgba( 118, 213, 152, 0.50 )');

        var answer2Field = document.createElement('input');
        answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
        answer2Field.setAttribute('class', 'answers');
        answer2Field.setAttribute('style', 'background-color:rgba( 218, 90, 251, 0.50 )');

        var answer3Field = document.createElement('input');
        answer3Field.setAttribute('placeholder', 'Enter the third answer here...');
        answer3Field.setAttribute('class', 'answers');
        answer3Field.setAttribute('style', 'background-color:rgba( 213, 203, 118, 0.50 )');

        var answer4Field = document.createElement('input');
        answer4Field.setAttribute('placeholder', 'Enter the fourth answer here...');
        answer4Field.setAttribute('class', 'answers');
        answer4Field.setAttribute('style', 'background-color:rgba( 90, 125, 251, 0.50 )');

        answer1Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][0][text]`);
        answer1Field.setAttribute('type', 'text');
        answer2Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][1][text]`);
        answer2Field.setAttribute('type', 'text');
        answer3Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][2][text]`);
        answer3Field.setAttribute('type', 'text');
        answer4Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][3][text]`);
        answer4Field.setAttribute('type', 'text');

        newAnswersDiv.appendChild(answer1Field);
        newAnswersDiv.appendChild(answer2Field);
        newAnswersDiv.appendChild(answer3Field);
        newAnswersDiv.appendChild(answer4Field);
        newQuestionDiv.appendChild(newAnswersDiv);


        correctField.setAttribute('name', `questions[${this.id.split('_')[1]}][correctAnswer]`);
        correctField.setAttribute('type', 'number');
        correctField.setAttribute('min', String(minVal));
        correctField.setAttribute('max', String(maxVal));

        cardFooter.appendChild(correctLabel);
        cardFooter.appendChild(correctField);
        newQuestionDiv.appendChild(cardFooter);
    });
    questionsDiv.appendChild(newQuestionDiv);                   //Adds the question div to the screen

    var colorPacket = randomColor().split('|');

    newQuestionDiv.style.background = colorPacket[0];
    newQuestionDiv.style.boxShadow = colorPacket[1];

    $(".deleteButton").click(function (event) {
        $(this).parent('.question-field').remove();
    });
    questionNum += 1;

    window.scrollTo(0, document.body.scrollHeight);
}


function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "/registeredUser/myProfile";
    }
}

function randomColor() {

    var colors = ['rgba( 118, 213, 152, 0.30 )| 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 'rgba( 218, 90, 251, 0.30 )|0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 'rgba( 213, 203, 118, 0.30 )|0 8px 32px 0 rgba( 31, 38, 135, 0.37 )', 'rgba( 90, 125, 251, 0.30 )|0 8px 32px 0 rgba( 31, 38, 135, 0.37 )'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

function mySubmit(form) {
    if (confirm("Are you sure you want to create?")) {
        window.location.href = "/registeredUser/myProfile";
        form.disable();
    }
}

function disable(ctrl) {
    ctrl.disable == true;
}