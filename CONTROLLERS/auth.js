const dbOperations = require('../DATA/userOperations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password} = req.body;

        if ( !email || !password) {
            return res.status(400).render('index', {
                message: 'Please provide an email and password'
            })
        }

        dbOperations.checkUserEmail(email).then (async result => {
            console.log((password === result[0].UserPassword));
            if (result === null || !(await bcrypt.compare(password, result[0].UserPassword))) {
                res.status(401).render('index', {
                    message: 'Email or Password is incorrect'
                })
            } else {
                const id = result[0].IDUserAccount;

                const token = jwt.sign( {id: id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                res.header('auth-token', token);
                console.log("The token is " + token);

                const cookieOptions = {
                    expires: new Date (
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("registeredUser");
            }
        })


    } catch (error) {
        console.log(error);
    }
}


exports.register = (req, res) => {
    console.log(req.body);

    const { username, email, password, passwordConfirm} = req.body;
    let istrue = false;

    dbOperations.checkUserEmail(email).then(async result => {
        if (result !== null ) {
            return res.render('index', {
                message: 'That email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.render('index', {
                message: 'Passwords do not match'
            });
        } 

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        dbOperations.createUser(username, email, hashedPassword)
        return res.render('index', {
            message: 'User registered'
        });
    });

}

exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect('/')
}