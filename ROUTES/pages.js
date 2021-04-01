var express = require('express');
const dbOperations = require('../DATA/userOperations');
const verify = require('./vertifyToken');


var authController = require('../CONTROLLERS/auth');


var router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);


    router.get( ('/'), verify, (request, response) => {
        response.redirect("/registeredUser");
    })


    router.get( ('/'), (request, response) => {
        
        dbOperations.getUsers().then(result => {
            console.log(result);
            
        })
        dbOperations.getUser(2).then(result => {
            console.log(result);
            
        })
        response.render("index");
    })



module.exports = router;