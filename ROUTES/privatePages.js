var express = require('express');
const verify = require('./verifyToken');
var authController = require('../CONTROLLERS/auth');
const quizOperations = require('../DATA/quizOperations');
const userOperations = require('../DATA/userOperations');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');



var router = express.Router();

router.post('/', authController.login);

router.get('/', verify, async (req, res) => {
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        return res.render('registeredUser', {
            quizzes: result
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
        quiz = { name: quizName.Title, questions: questions, points: questions[0].points };
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
        return res.render('myProfile', {
            quizzes: quizzes
        });
    })
})

router.post('/myProfile', verify, async (req, res) => {
    var quizID = await quizOperations.createQuiz(req.body.name, req.user);
    for (const question of req.body.questions.entries()) {
        var questionID = await quizOperations.createQuestion(question[1].text, question[1].timer, req.body.pointsPerQuestion, quizID);
        for (const [index, answer] of question[1].answers.entries()) {
            if (index + 1 === parseInt(question[1].correctAnswer)) {
                await quizOperations.createAnswer(answer.text, true, questionID);
            } else {
                await quizOperations.createAnswer(answer.text, false, questionID);
            }
        };
    };
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
        return res.render('myProfile', {
            quizzes: quizzes
        });
    })
})

router.get('/myProfile/deleteQuiz', verify, async (req, res) => {
    await quizOperations.deleteQuiz(req.query.id)
    return res.redirect('/registeredUser/myProfile')
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
    console.log(req.user);
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    console.log(hashedPassword);
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

router.post('/editProfile/Change-Password-With-Mail', verify, (req, res) => {
    userOperations.getUser(req.user).then(async result => {

        var email = result[0][0].Email;
        let hashedEmail = await bcrypt.hash(email, 8);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'wizardquizard@gmail.com',
                pass: 'SuperTajnaPraSifra'
            }
        });

        var mailOptions = {
            from: 'wizardquizard@gmail.com',
            to: email,
            subject: 'Change pasword',
            text: `Link to change pasword: http://localhost:8091/changePassword?email=${hashedEmail}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return res.render('editProfile', {
            firstName: result[0][0].FirstName,
            lastName: result[0][0].LastName,
            Email: result[0][0].Email,
            UserPassword: result[0][0].UserPassword
        });
    })
})



module.exports = router;
