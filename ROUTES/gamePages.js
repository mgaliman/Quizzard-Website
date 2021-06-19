var express = require('express');
const verify = require('./verifyToken');
const verifyGame = require('./gameToken');
var gameController = require('../CONTROLLERS/game');
const quizOperations = require('../DATA/quizOperations');


var authController = require('../CONTROLLERS/auth');
const gameOperations = require('../DATA/gameOperations');



var router = express.Router();

router.get(('/QnARegisteredScreen'), verify, async (req, res) => {
    var { key, qnum } = req.query;
    var answers = [];
    var question = await quizOperations.getQuestion(key, qnum);
    var dbAnswers = await quizOperations.getAnswersFromQuestion(question.IDQuestion);
    for (const answer of dbAnswers.entries()) {
        answers.push({ text: answer[1].Answer });
    }

    res.render("QnARegisteredScreen", {
        question: question.Question,
        answers: answers
    });
})

router.post(('/quiz'), gameController.joinGame);

router.get(('/quiz'), verifyGame, (req, res) => {
    res.render("quiz")
});

router.get(('/qs'), verifyGame, async (req, res) => {
    var { key, qnum } = req.query;

    var answers = [];
    var question = await quizOperations.getQuestion(key, qnum);
    var dbAnswers = await quizOperations.getAnswersFromQuestion(question.IDQuestion);
    for (const answer of dbAnswers.entries()) {
        answers.push({ anum: answer[0], idAnswer: answer[1].IDAnswer, points: question.Points, player: req.user });
    }
    res.render("qs", {
        answers: answers
    });
});
router.get(('/as'), verifyGame, async (req, res) => {
    res.render("as")
});
router.get(('/ScoreBoard'), verify, async (req, res) => {
    var { key } = req.query;
    var players = await gameOperations.getTopThreePlayers(key);
    var first = ({ nickname: '', points: '' });
    var second = ({ nickname: '', points: '' });
    var third = ({ nickname: '', points: '' });
    if (players[0]) {

        first = ({ nickname: players[0].Nickname, points: players[0].Points });
    }
    if (players[1]) {

        second = ({ nickname: players[1].Nickname, points: players[1].Points });
    }
    if (players[2]) {

        third = ({ nickname: players[2].Nickname, points: players[2].Points });
    }
    res.render("ScoreBoard", {
        first: first,
        second: second,
        third: third,
    });
});
router.get(('/results'), verifyGame, async (req, res) => {
    var player = await gameOperations.getplayer(req.user);
    res.render("results", {
        points: player.Points
    });
});

router.get(('/GameWasCanceled'), verifyGame, gameController.quitGame);



router.get('/joiningScreen', verify, gameController.createGame);


router.get('/ScoreBoard', (req, res) => {
    return res.render('ScoreBoard');
})


module.exports = router;
