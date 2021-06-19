var express = require('express');
const verify = require('./verifyToken');
var authController = require('../CONTROLLERS/auth');
const quizOperations = require('../DATA/quizOperations');
const userOperations = require('../DATA/userOperations');
const bcrypt = require('bcryptjs');


var router = express.Router();

router.post('/', authController.login);

router.get('/', verify, async (req, res) => {
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        return res.render('registeredUser', {
            quizzes: result[0]
        });
    })
})



router.get('/createAQuiz', verify, async (req, res) => {
    var quiz = "";
    if (req.query.name) {
        var quizName = await quizOperations.getQuiz(req.query.name);
        var questions = [];
        var dbQuestions = await quizOperations.getQuestionsFromQuiz(req.query.name);
        for (const [index, question] of dbQuestions.entries()) {
            var dbAnswers = await quizOperations.getAnswersFromQuestion(question.IDQuestion);
            var answers = [];
            var correctAnswer = 0;
            for (const [indexa, answer] of dbAnswers.entries()) {
                if (answer.RightAnswer === true) { correctAnswer = indexa + 1 };
                answers.push({ index: index, text: answer.Answer });
            }
            questions.push({ text: question.Question, correctAnswer: correctAnswer, duration: question.Duration, points: question.Points, answers: answers, anum: answers.length });
        }
        quiz = { name: quizName.Title, questions: questions };
    }
    return res.render('createAQuiz', {
        quiz: quiz
    });
})

router.get('/myProfile', verify, (req, res) => {
    var quizzes = [];
    quizOperations.GetQuizzesFromUser(req.user).then(async result => {
        var quiz = "";
        for (const dbquiz of result.entries()) {
            var questions = [];
            var dbQuestions = await quizOperations.getQuestionsFromQuiz(dbquiz[1].IDQuiz);
            for (const [index, question] of dbQuestions.entries()) {
                var dbAnswers = await quizOperations.getAnswersFromQuestion(question.IDQuestion);
                var answers = [];
                var correctAnswer = 0;
                for (const [indexa, answer] of dbAnswers.entries()) {
                    if (answer.RightAnswer === true) { correctAnswer = indexa + 1 };
                    answers.push({ index: index, text: answer.Answer });
                }
                questions.push({ text: question.Question, correctAnswer: correctAnswer, duration: question.Duration, points: question.Points, answers: answers, anum: answers.length });
            }
            quiz = { name: dbquiz[1].Title, IDQuiz: dbquiz[1].IDQuiz, questions: questions };
            quizzes.push(quiz);
        }
        console.log(quizzes[0].questions[2].answers);
        return res.render('myProfile', {
            quizzes: quizzes
        });
    })

})

router.post('/myProfile', verify, async (req, res) => {
    var quizID = await quizOperations.createQuiz(req.body.name, req.user);
    for (const question of req.body.questions.entries()) {
        var questionID = await quizOperations.createQuestion(question[1].text, 10, 5, quizID);
        for (const [index, answer] of question[1].answers.entries()) {
            if (index + 1 === parseInt(question[1].correctAnswer)) {
                await quizOperations.createAnswer(answer.text, true, questionID);
            } else {
                await quizOperations.createAnswer(answer.text, false, questionID);
            }
        };
    };
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        return res.render('myProfile', {
            quizzes: result[0]
        });
    })
})

router.get('/myProfile/deleteQuiz', verify, async (req, res) => {
    await quizOperations.deleteQuiz(req.query.id)
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        return res.render('myProfile', {
            quizzes: result[0]
        });
    })
})

router.get('/editProfile', verify, (req, res) => {

    userOperations.getUser(req.user).then(result => {

        return res.render('editProfile', {
            firstName: result[0][0].FirstName,
            lastName: result[0][0].LastName,
            Email: result[0][0].Email,
            UserPassword: result[0][0].UserPassword
        });

    })

})

router.post('/editProfile', verify, async (req, res) => {

    let hashedPassword = await bcrypt.hash(req.body.Password, 8);
    userOperations.UpdateUser(req.user, req.body.firstName, req.body.lastName, hashedPassword).then(result => {
        userOperations.getUser(req.user).then(result => {
            return res.render('editProfile', {
                firstName: result[0][0].FirstName,
                lastName: result[0][0].LastName,
                Email: result[0][0].Email,
                UserPassword: result[0][0].UserPassword
            });

        })

    })
})




module.exports = router;
