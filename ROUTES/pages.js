var express = require('express');
const dbOperations = require('../DATA/userOperations');
const verify = require('./vertifyToken');


var authController = require('../CONTROLLERS/auth');


var router = express.Router();


router.get(('/'), verify, (request, response) => {
    response.redirect("/registeredUser");
})


router.get(('/'), (request, response) => {
    response.render("index");
})

router.get(('/EnterNick'), (request, response) => {
    response.render("EnterNick");
})

router.get(('/howTo'), (request, response) => {
    response.render("howTo");
})

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);


module.exports = router;