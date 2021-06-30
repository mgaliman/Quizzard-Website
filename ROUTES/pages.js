var express = require('express');
const dbOperations = require('../DATA/userOperations');
const verify = require('./verifyToken');


var authController = require('../CONTROLLERS/auth');


var router = express.Router();


router.get(('/'), verify, (request, response) => {
    response.redirect("/registeredUser");
})


router.get(('/'), (request, response) => {
    response.render("index");
})
router.post('/Password-has-been-changed', authController.changePassword);

router.get(('/EnterNick'), (request, response) => {
    response.render("EnterNick");
})
router.get(('/howTo'), (request, response) => {
    response.render("howTo");
})

router.get(('/changePassword'), (request, response) => {
    response.render("changePassword");
})

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);


module.exports = router;