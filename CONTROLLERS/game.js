const dbOperations = require('../DATA/gameOperations');
const quizOperations = require('../DATA/quizOperations');
const dbPlayerOperations = require('../DATA/playerOperations.js');
const jwt = require('jsonwebtoken');

exports.createGame = async (req, res) => {
    try {

        const quizID = req.query.ID;
        dbOperations.getGameByQuiz(quizID).then(async result => {
            var players = null;
            var game = null;
            if (result === null) {
                const gameKey = createKey();
                var id = await dbOperations.createGame(gameKey, quizID);
                game = await dbOperations.getGameByKey(gameKey);
            } else {
                players = await dbOperations.getGamePlayers(result[0].IDGame);
                game = result;
            }
            res.render("joiningScreen", {
                game: game[0],
                players: players,

            });
        })


    } catch (error) {
        console.log(error);
    }
}

exports.joinGame = async (req, res) => {
    try {
        const { nickname, key } = req.body;
        dbOperations.getGameByKey(key).then(async result => {
            if (result === null) {
                res.status(401).render('EnterNick', {
                    message: 'Quiz not found'
                });
            } else {
                dbOperations.checkNickname(nickname, key).then(players => {
                    if (players !== null) {
                        res.status(401).render('EnterNick', {
                            message: 'Nickname already exists'
                        });
                    } else {
                        dbPlayerOperations.createPlayer(nickname, key, result[0].IDGame).then(player => {
                            const id = player;
                            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                                expiresIn: process.env.JWT_EXPIRES_IN
                            });
                            res.header('game-token', token);
                            const cookieOptions = {
                                expires: new Date(
                                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                ),
                                httpOnly: true
                            }
                            res.cookie('game', token, cookieOptions);
                            res.status(200).redirect(`/game/quiz?nickname=${nickname}&key=${key}`);
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.cancleGame = async (key) => {
    try {
        await dbOperations.deleteGame(key);
    } catch (error) {
        console.log(error);
    }
}


exports.quitGame = (req, res) => {
    res.clearCookie("game");
    res.render('EnterNick');
}

exports.submitAnswer = async (idAnswer, maxPoints, player) => {
    var answer = await quizOperations.getAnswer(idAnswer);

    if (answer.RightAnswer === true) {
        dbOperations.addPoints(player, maxPoints);
    }
}


function createKey() {
    //ID generator
    return randomstring = Math.random().toString(36).slice(-8);
    // Generate random number, eg: 0.123456
    // Convert  to base-36 : "0.4fzyo82mvyr"
    // Cut off last 8 characters : "yo82mvyr"
}

