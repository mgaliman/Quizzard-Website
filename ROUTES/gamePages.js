var express = require('express');
const verify = require('./gameToken');
var authController = require('../CONTROLLERS/auth');
const quizOperations = require('../DATA/quizOperations');
const userOperations = require('../DATA/userOperations');
const bcrypt = require('bcryptjs');


var authController = require('../CONTROLLERS/auth');



var router = express.Router();

router.post('/', authController.gameEnter);


router.post('/question', verify, async (req, res) => {

    quizOperations.getQuestion(req.user, req.body.qNum).then(result => {
        return res.render('question', {
            questions: result[0]
        });

    })
})
router.post('/results', verify, async (req, res) => {

    await quizOperations.insertResults(req.body.name, req.body.point, req.user);
    quizOperations.GetResultsFromQuiz(req.quiz).then(result => {
        return res.render('results', {
            result: result
        });

    })
})
router.get('/results', async (req, res) => {

    return res.render('results', {
        name: "Marko",
        points: 13
    });
})

router.get('/joiningScreen', (req, res) => {
    return res.render('joiningScreen', {
        name: req.query.name,
        code: generateID()
    });
})

router.get(('/QnARegisteredScreen'), (request, response) => {
    response.render("QnARegisteredScreen");
})

router.post(('/quiz'), (request, response) => {
    response.render("quiz");
})


router.get('/joiningScreen', verify, (req, res) => {
    return res.render('joiningScreen', {
        name: req.query.name,
        code: generateID()
    });
})
router.get('/ScoreBoard', (req, res) => {
    return res.render('ScoreBoard');
})

function generateID() {
    //ID generator
    return randomstring = Math.random().toString(36).slice(-8);
    // Generate random number, eg: 0.123456
    // Convert  to base-36 : "0.4fzyo82mvyr"
    // Cut off last 8 characters : "yo82mvyr"
}




module.exports = router;





// QUESTIONS:
//  {
//      {
//          text: "Pitanje 1?",
//          {
//               {
//                  text: "odgovor 1",
//                  tocan: true
//               }
//               {
//                  text: "odgovor 2",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 3",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 4",
//                  tocan: false
//               }
//          }
//      }
//      {
//          text: "Pitanje 2?",
//          odgovori:  [
//               {
//                  text: "odgovor 1",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 2",
//                  tocan: true
//               }
//               {
//                  text: "odgovor 3",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 4",
//                  tocan: false
//               }
//          ]
//      }
//      {
//          text: "Pitanje 3?",
//          {
//               {
//                  text: "odgovor 1",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 2",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 3",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 4",
//                  tocan: true
//               }
//          }
//      }
//      {
//          text: "Pitanje 4?",
//          {
//               {
//                  text: "odgovor 1",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 2",
//                  tocan: true
//               }
//               {
//                  text: "odgovor 3",
//                  tocan: false
//               }
//               {
//                  text: "odgovor 4",
//                  tocan: false
//               }
//          }
//      }
//  }

// RESULTS:
//  {
//      {
//          username: frameElement,
//          points: 10
//      }
//      {
//          username: frameElement,
//          points: 10
//      }
//      {
//          username: frameElement,
//          points: 10
//      }
//      {
//          username: frameElement,
//          points: 10
//      }
//      {
//          username: frameElement,
//          points: 10
//      }
//  }