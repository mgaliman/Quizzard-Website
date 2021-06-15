var express = require('express');
const verify = require('./verifyToken');
const verifyGame = require('./gameToken');
var authController = require('../CONTROLLERS/auth');
var gameController = require('../CONTROLLERS/game');
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


router.get(('/QnARegisteredScreen'), (request, response) => {
    response.render("QnARegisteredScreen");
})

router.post(('/quiz'), gameController.joinGame);
router.get(('/quiz'), verifyGame, (req, res) => {
    res.render("quiz")
});
router.get(('/qs'), verifyGame, (req, res) => {
    res.render("qs")
});
router.get(('/as'), verifyGame, (req, res) => {
    res.render("as")
});
router.get(('/ScoreBoard'), verifyGame, (req, res) => {
    res.render("ScoreBoard")
});
router.get(('/results'), verify, (req, res) => {
    res.render("results")
});

router.get(('/GameWasCanceled'), verifyGame, gameController.quitGame);



router.get('/joiningScreen', verify, gameController.createGame);

//     (req, res) => {
//     return res.render('joiningScreen', {
//         name: req.query.ID,
//         code: generateID()
//     });
// }

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