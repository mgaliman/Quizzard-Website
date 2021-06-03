var express = require('express');
const verify = require('./vertifyToken');
var authController = require('../CONTROLLERS/auth');
const quizOperations = require('../DATA/quizOperations');
const userOperations = require('../DATA/userOperations');
const bcrypt = require('bcryptjs');



var router = express.Router();

router.post('/', authController.login);

router.get('/', verify, async (req, res) => {
    console.log(req.user);
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        console.log(result);
        return res.render('registeredUser', {
            quizzes: result[0]
        });
    })
})

router.get('/createAQuiz', verify, (req, res) => {
    return res.render('createAQuiz', {
        name: req.query.name
    });
})

router.get('/myProfile', verify, (req, res) => {

    console.log(req.user);
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        console.log(result);
        return res.render('myProfile', {
            quizzes: result[0]
        });

    })

})

router.post('/myProfile', verify, async (req, res) => {
    console.log(req.user);

    await quizOperations.createQuiz(req.body.name, req.user);
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        console.log(result);
        return res.render('myProfile', {
            quizzes: result[0]
        });
    })
})
router.get('/myProfile/deleteQuiz', verify, async (req, res) => {
    await quizOperations.deleteQuiz(req.query.id)
    quizOperations.GetQuizzesFromUser(req.user).then(result => {
        console.log(result);
        return res.render('myProfile', {
            quizzes: result[0]
        });
    })
})

router.get('/editProfile', verify, (req, res) => {

    console.log(req.user);
    userOperations.getUser(req.user).then(result => {
        console.log(result);

        return res.render('editProfile', {
            firstName: result[0][0].FirstName,
            lastName: result[0][0].LastName,
            Email: result[0][0].Email,
            UserPassword: result[0][0].UserPassword
        });

    })

})

router.post('/editProfile', verify, async (req, res) => {

    console.log(req.user);
    let hashedPassword = await bcrypt.hash(req.body.Password, 8);
    userOperations.UpdateUser(req.user, req.body.firstName, req.body.lastName, hashedPassword).then(result => {
        userOperations.getUser(req.user).then(result => {
            console.log(result);
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