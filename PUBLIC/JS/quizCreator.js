var questionNum = 0;

$(document).ready(function () {
    $('#saveBtn').attr('disabled', true);

    $('.myField input').keyup(function () {
        if ($('.myField input') != 0) {
            $('#saveBtn').attr('disabled', false);
        }
    })

});

function addQuestion() {
    questionNum += 1;

    var questionsDiv = document.getElementById('allQuestions');

    var newQuestionDiv = document.createElement("div");         //QUESTION CARD
    newQuestionDiv.setAttribute('id', 'question-field'); 
    newQuestionDiv.setAttribute('draggable', 'true');    
    newQuestionDiv.setAttribute('class', 'animated bounceInLeft');
    newQuestionDiv.setAttribute('name', 'questionCard' + String(questionNum));

    var deleteButton = document.createElement('button');      //DELETE BUTTON
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.innerHTML = "Delete question ";

    var timerInput = document.createElement('input');      //TIMER
    timerInput.setAttribute('id', 'timer');
    timerInput.setAttribute('name', 'timer');
    timerInput.setAttribute('type', 'time');
    timerInput.setAttribute('step', '1');

    var lblTimer = document.createElement('label');     
    lblTimer.setAttribute('id', 'lblTimer');
    lblTimer.innerHTML="Timer:"

    var newAnswersDiv = document.createElement("div");      //ANSWERS GRID
    newAnswersDiv.setAttribute('id', 'answer-field');
    newAnswersDiv.setAttribute('class', 'animated zoomIn');

    var chooseDiv = document.createElement("div");      //CHOOSE NUMBER DIV
    chooseDiv.setAttribute('id', 'chooseDiv');

    var answerNumberLabel = document.createElement('label');
    answerNumberLabel.setAttribute('class', 'answerNumberLabel');
    answerNumberLabel.innerHTML = "Choose the number of answers:";

    var twoAnswers = document.createElement('button');
    twoAnswers.setAttribute('id', 'twoAnsr' + String(questionNum));
    twoAnswers.setAttribute('type', 'button');
    twoAnswers.innerHTML = "2";

    var fourAnswers = document.createElement('button');
    fourAnswers.setAttribute('id', 'fourAnsr' + String(questionNum));
    fourAnswers.setAttribute('type', 'button');
    fourAnswers.innerHTML = "4";

    var questionField = document.createElement('textarea');
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('name', 'q' + String(questionNum));
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


    $(`#twoAnsr${String(questionNum)}`).click(function () {

        $(newAnswersDiv).empty();
        correctField.value="";

            maxVal = 2;
            correctLabel.innerHTML = "Correct Answer (1/2): ";

            var answer1Field = document.createElement('input');
            answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
            answer1Field.setAttribute('class', 'answers');
            answer1Field.setAttribute('style', 'background-color:#C04595');

            var answer2Field = document.createElement('input');
            answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
            answer2Field.setAttribute('class', 'answers');
            answer2Field.setAttribute('style', 'background-color:#45C070');

            answer1Field.setAttribute('name', String(questionNum) + "a1");
            answer1Field.setAttribute('type', 'text');
            answer2Field.setAttribute('name', String(questionNum) + "a2");
            answer2Field.setAttribute('type', 'text');

            newAnswersDiv.appendChild(answer1Field);
            newAnswersDiv.appendChild(answer2Field);
            newQuestionDiv.appendChild(newAnswersDiv);
        
        correctField.setAttribute('name', 'correct' + String(questionNum));
        correctField.setAttribute('type', 'number');
        correctField.setAttribute('min', String(minVal));
        correctField.setAttribute('max', String(maxVal));

        cardFooter.appendChild(correctLabel);
        cardFooter.appendChild(correctField);
        newQuestionDiv.appendChild(cardFooter);
    });

    $(`#fourAnsr${String(questionNum)}`).click(function () {

        $(newAnswersDiv).empty();
        correctField.value="";

            maxVal = 4;
            correctLabel.innerHTML = "Correct Answer (1-4): ";

            var answer1Field = document.createElement('input');
            answer1Field.setAttribute('placeholder', 'Enter the first answer here...');
            answer1Field.setAttribute('class', 'answers');
            answer1Field.setAttribute('style', 'background-color:#C04595');

            var answer2Field = document.createElement('input');
            answer2Field.setAttribute('placeholder', 'Enter the second answer here...');
            answer2Field.setAttribute('class', 'answers');
            answer2Field.setAttribute('style', 'background-color:#45C070');

            var answer3Field = document.createElement('input');
            answer3Field.setAttribute('placeholder', 'Enter the third answer here...');
            answer3Field.setAttribute('class', 'answers');
            answer3Field.setAttribute('style', 'background-color:#C0AD45');

            var answer4Field = document.createElement('input');
            answer4Field.setAttribute('placeholder', 'Enter the fourth answer here...');
            answer4Field.setAttribute('class', 'answers');
            answer4Field.setAttribute('style', 'background-color:#4558C0');

            answer1Field.setAttribute('name', String(questionNum) + "a1");
            answer1Field.setAttribute('type', 'text');
            answer2Field.setAttribute('name', String(questionNum) + "a2");
            answer2Field.setAttribute('type', 'text');
            answer3Field.setAttribute('name', String(questionNum) + "a3");
            answer3Field.setAttribute('type', 'text');
            answer4Field.setAttribute('name', String(questionNum) + "a4");
            answer4Field.setAttribute('type', 'text');

            newAnswersDiv.appendChild(answer1Field);
            newAnswersDiv.appendChild(answer2Field);
            newAnswersDiv.appendChild(answer3Field);
            newAnswersDiv.appendChild(answer4Field);
            newQuestionDiv.appendChild(newAnswersDiv);

        
        correctField.setAttribute('name', 'correct' + String(questionNum));
        correctField.setAttribute('type', 'number');
        correctField.setAttribute('min', String(minVal));
        correctField.setAttribute('max', String(maxVal));

        cardFooter.appendChild(correctLabel);
        cardFooter.appendChild(correctField);
        newQuestionDiv.appendChild(cardFooter);
    });
    questionsDiv.appendChild(newQuestionDiv);                   //Adds the question div to the screen

    newQuestionDiv.style.backgroundColor = randomColor();

    $(".deleteButton").click(function (event) {
        event.preventDefault();
        $(this).parent('#question-field').remove();
    });

      //////////////////////////////////////////////////
    //////////////// DRAG AND DROP ///////////////////
    /////////////////////////////////////////////////

    const draggables=document.querySelectorAll("#question-field");

        draggables.forEach(draggable=>{
            draggable.addEventListener('dragstart',()=>{
                draggable.classList.add('.dragging')
            })
        })

        questionsDiv.addEventListener('dragover', ()=>{
            const draggable=document.querySelector('.dragging')

             questionsDiv.appendChild(draggable)
        })
}


function cancelQuiz() {
    if (confirm("Are you sure you want to exit? All work will be DELETED!")) {
        window.location.href = "/registeredUser/myProfile";
    }
}

function randomColor() {

    var colors = ['#EBCEED', '#D3F1D2', '#FEECD6', '#C1E1E2'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}