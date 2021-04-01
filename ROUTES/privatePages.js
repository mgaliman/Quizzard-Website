var express = require('express');
const verify = require('./vertifyToken');
var authController = require('../CONTROLLERS/auth');
const quizOperations = require('../DATA/quizOperations');
const userOperations = require('../DATA/userOperations');
const bcrypt = require('bcryptjs');



var router = express.Router();

router.post('/', authController.login);
router.get('/createAQuiz', verify, (req, res) => {
    res.render("createAQuiz");
})

router.get('/myProfile', verify, (req, res) => {
    
        console.log(req.user);
        quizOperations.GetQuizzesFromUser(req.user).then(result => {
            return res.render('myProfile', {
                quizzes: result[0]
            });
            
        })

})
router.get('/editProfile', verify, (req, res) => {
    
        console.log(req.user);
        userOperations.getUser(req.user).then(result => {
            return res.render('editProfile', {
                UserName: result[0][0].UserName,
                Email: result[0][0].Email,
                UserPassword: result[0][0].UserPassword
            });
            
        })

})
router.post('/editProfile', verify, async (req, res) => {
    
        console.log(req.user);
        let hashedPassword = await bcrypt.hash(req.body.Password, 8);
        userOperations.UpdateUser(req.user, req.body.username, req.body.email, hashedPassword).then(result => {
            userOperations.getUser(req.user).then(result => {
                return res.render('editProfile', {
                    UserName: result[0][0].UserName,
                    Email: result[0][0].Email,
                    UserPassword: result[0][0].UserPassword
                });
                
            })
            
        })

})

router.get('/', verify, (req, res) => {
    res.render("registeredUser");
})



module.exports = router;