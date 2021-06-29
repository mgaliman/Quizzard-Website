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
    timerInput.setAttribute('value', '10');

    var lblTimer = document.createElement('label');
    lblTimer.setAttribute('class', 'lblTimer');
    lblTimer.innerHTML = "Timer:"

    var seconds = document.createElement('label');
    seconds.innerHTML = "seconds"

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

    var threeAnswers = document.createElement('button');
    threeAnswers.setAttribute('id', 'threeAnsr_' + String(questionNum));
    threeAnswers.setAttribute('type', 'button');
    threeAnswers.innerHTML = "3";

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
    newQuestionDiv.appendChild(seconds);

    chooseDiv.appendChild(answerNumberLabel);
    chooseDiv.appendChild(twoAnswers);
    chooseDiv.appendChild(threeAnswers);
    chooseDiv.appendChild(fourAnswers);
    newQuestionDiv.appendChild(chooseDiv);

    questionsDiv.appendChild(newQuestionDiv);                   //Adds the question div to the screen


    $(`#twoAnsr_${String(questionNum)}`).click(function () {
        $(newAnswersDiv).empty();

        maxVal = 2;
        correctLabel.innerHTML = "Correct Answer (1/2): ";

        var answer1Field = document.createElement('input');
        answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
        answer1Field.setAttribute('style', 'background-color:rgba( 218, 90, 251, 0.50 )');
        answer1Field.setAttribute('class', 'answers');
        answer1Field.setAttribute('style', 'background-color: #7a84bd');

        var answer1Img = document.createElement('img');
        answer1Img.setAttribute('src', '/IMAGES/0.png');
        answer1Img.setAttribute('translate', 'no');
        answer1Img.setAttribute('width', '60px');
        var answer2Img = document.createElement('img');
        answer2Img.setAttribute('src', '/IMAGES/1.png');
        answer2Img.setAttribute('translate', 'no');
        answer2Img.setAttribute('width', '60px');

        var answer2Field = document.createElement('input');
        answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
        answer2Field.setAttribute('class', 'answers');
        answer2Field.setAttribute('style', 'background-color:#bdb37a');

        answer1Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][0][text]`);
        answer1Field.setAttribute('type', 'text');
        answer2Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][1][text]`);
        answer2Field.setAttribute('type', 'text');

        newAnswersDiv.appendChild(answer1Img);
        newAnswersDiv.appendChild(answer1Field);
        newAnswersDiv.appendChild(answer2Img);
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

    $(`#threeAnsr_${String(questionNum)}`).click(function () {
        $(newAnswersDiv).empty();

        maxVal = 2;
        correctLabel.innerHTML = "Correct Answer (1/2): ";

        var answer1Field = document.createElement('input');
        answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
        answer1Field.setAttribute('class', 'answers');
        answer1Field.setAttribute('style', 'background-color: #7a84bd');

        var answer1Img = document.createElement('img');
        answer1Img.setAttribute('src', '/IMAGES/0.png');
        answer1Img.setAttribute('translate', 'no');
        answer1Img.setAttribute('width', '60px');
        var answer2Img = document.createElement('img');
        answer2Img.setAttribute('src', '/IMAGES/1.png');
        answer2Img.setAttribute('translate', 'no');
        answer2Img.setAttribute('width', '60px');
        var answer3Img = document.createElement('img');
        answer3Img.setAttribute('src', '/IMAGES/2.png');
        answer3Img.setAttribute('translate', 'no');
        answer3Img.setAttribute('width', '60px');

        var answer2Field = document.createElement('input');
        answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
        answer2Field.setAttribute('class', 'answers');
        answer2Field.setAttribute('style', 'background-color:#bdb37a');

        var answer3Field = document.createElement('input');
        answer3Field.setAttribute('placeholder', 'Enter the third answer here...');
        answer3Field.setAttribute('class', 'answers');
        answer3Field.setAttribute('style', 'background-color:#7abd92');

        answer1Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][0][text]`);
        answer1Field.setAttribute('type', 'text');
        answer2Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][1][text]`);
        answer2Field.setAttribute('type', 'text');
        answer3Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][2][text]`);
        answer3Field.setAttribute('type', 'text');

        newAnswersDiv.appendChild(answer1Img);
        newAnswersDiv.appendChild(answer1Field);
        newAnswersDiv.appendChild(answer2Img);
        newAnswersDiv.appendChild(answer2Field);
        newAnswersDiv.appendChild(answer3Img);
        newAnswersDiv.appendChild(answer3Field);
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

        //<img src="/IMAGES/0.png" alt="#" translate="no" width="60px"></img>
        var answer1Field = document.createElement('input');
        answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
        answer1Field.setAttribute('style', 'background-color:rgba( 218, 90, 251, 0.50 )');
        answer1Field.setAttribute('class', 'answers');
        answer1Field.setAttribute('style', 'background-color: #7a84bd');

        var answer1Img = document.createElement('img');
        answer1Img.setAttribute('src', '/IMAGES/0.png');
        answer1Img.setAttribute('translate', 'no');
        answer1Img.setAttribute('width', '60px');
        var answer2Img = document.createElement('img');
        answer2Img.setAttribute('src', '/IMAGES/1.png');
        answer2Img.setAttribute('translate', 'no');
        answer2Img.setAttribute('width', '60px');
        var answer3Img = document.createElement('img');
        answer3Img.setAttribute('src', '/IMAGES/2.png');
        answer3Img.setAttribute('translate', 'no');
        answer3Img.setAttribute('width', '60px');
        var answer4Img = document.createElement('img');
        answer4Img.setAttribute('src', '/IMAGES/3.png');
        answer4Img.setAttribute('translate', 'no');
        answer4Img.setAttribute('width', '60px');

        var answer2Field = document.createElement('input');
        answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
        answer2Field.setAttribute('class', 'answers');
        answer2Field.setAttribute('style', 'background-color:#bdb37a');

        var answer3Field = document.createElement('input');
        answer3Field.setAttribute('placeholder', 'Enter the third answer here...');
        answer3Field.setAttribute('class', 'answers');
        answer3Field.setAttribute('style', 'background-color:#7abd92');

        var answer4Field = document.createElement('input');
        answer4Field.setAttribute('placeholder', 'Enter the fourth answer here...');
        answer4Field.setAttribute('class', 'answers');
        answer4Field.setAttribute('style', 'background-color:#bd7aa5');

        answer1Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][0][text]`);
        answer1Field.setAttribute('type', 'text');
        answer2Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][1][text]`);
        answer2Field.setAttribute('type', 'text');
        answer3Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][2][text]`);
        answer3Field.setAttribute('type', 'text');
        answer4Field.setAttribute('name', `questions[${this.id.split('_')[1]}][answers][3][text]`);
        answer4Field.setAttribute('type', 'text');

        newAnswersDiv.appendChild(answer1Img);
        newAnswersDiv.appendChild(answer1Field);
        newAnswersDiv.appendChild(answer2Img);
        newAnswersDiv.appendChild(answer2Field);
        newAnswersDiv.appendChild(answer3Img);
        newAnswersDiv.appendChild(answer3Field);
        newAnswersDiv.appendChild(answer4Img);
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

// Make the DIV element draggable:
dragElement(document.getElementById("allQuestions"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0;
    if (document.getElementById("dragContent")) {
        // if present, the header is where you move the DIV from:
        document.getElementById("dragContent").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:s
        pos2 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos2 - e.clientY;
        pos2 = e.clientY;
        // set the element's new position:

        elmnt.style.top = (elmnt.offsetTop - pos1 * 2) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/*!
 * Run a callback function after scrolling has stopped
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} callback The callback function to run after scrolling
 * @param  {Integer}  refresh  How long to wait between scroll events [optional]
 */
var questions = document.getElementById("allQuestions");
function scrollStop(callback, refresh = 66) {

    // Make sure a valid callback was provided
    if (!callback || typeof callback !== 'function') return;

    // Setup scrolling variable
    let isScrolling;

    var scrolled = 0;

    // Listen for scroll events
    window.addEventListener('scroll', function (event) {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // scrolled += window.scrollY;
        var ofset = scrolled + window.scrollY;
        // var scrolled = window.scrollY / (document.getElementById("allQuestions").offsetHeight);
        if (ofset > 200) {
            ofset = 200
        }
        console.log("window.scrollY: " + window.scrollY);
        console.log("scrolled: " + ofset);
        console.log("scrolled: " + scrolled);
        // var zoomLevels = 1; //change to have a different behavior
        // var scale = Math.pow(3, scrolled * zoomLevels);
        // console.log("scale:" + scale);

        questions.style.transform = " perspective(500px) translatez(-" + ofset + "px)"

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(callback, refresh);

    }, false);

}
scrollStop(function () {
    console.log('Scrolling has stopped.');
    questions.style.transform = " perspective(500px) translatez(-" + 0 + "px)"
    questions.style.transitionDelay = "1s"
    isScrolling = setTimeout(function () {
        questions.style.transitionDelay = "0s"
    }, 1000);
});
