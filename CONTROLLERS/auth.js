const dbOperations = require('../DATA/userOperations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('index', {
                message: 'Please provide an email and password',
                emailL: req.body.email
            })
        }

        dbOperations.checkUserEmail(email).then(async result => {
            if (result === null || !(await bcrypt.compare(password, result[0].UserPassword))) {
                res.status(401).render('index', {
                    message: 'Email or Password is incorrect',
                    emailL: req.body.email
                })
            } else {
                const id = result[0].IDUserAccount;

                const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                res.header('auth-token', token);
                const cookieOptions = {
                    expires: new Date(
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

    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    dbOperations.checkUserEmail(email).then(async result => {
        if (result !== null) {
            return res.render('index', {
                message: 'That email is already in use',
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else if (password !== passwordConfirm) {
            return res.render('index', {
                message: 'Passwords do not match',
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        await dbOperations.createUser(firstName, lastName, email, hashedPassword);
        res.redirect(307, '/login');
        // return res.render('index', {
        //     message: 'User registered'
        // });
    })
}

exports.changePassword = async (req, res) => {

    const { password, passwordConfirm, emailHash } = req.body;
    if (password !== passwordConfirm) {
        return res.render('changePassword', {
            message: 'Passwords do not match',
        });
    } else {
        var users = await dbOperations.getUsers();
        for (const user of users[0].entries()) {
            var email = user[1].Email;
            console.log(await bcrypt.compare(email, emailHash));
            if ((await bcrypt.compare(email, emailHash))) {
                console.log(user[1].Email);
                console.log(password);
                hashPasw = await bcrypt.hash(password, 8);
                dbOperations.changePassword(user[1].Email, hashPasw).then(async result => {
                    console.log(result, "fsfefef")
                    res.render('index');
                });
            }
            // if (await bcrypt.compare(email, emailHash)) {
            //     hashPasw = bcrypt.hash(password, 8);
            //     dbOperations.changePassword(user.Email, hashPasw).then(async result => {
            //         return res.render('index');
            //     });
            // }
        }
    }
}


exports.logout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect('/');
}


exports.gameEnter = async (req, res) => {
    try {
        const { username, quizKey } = req.body;

        if (!username || !quizKey) {
            return res.status(400).render('index', {
                message: 'Please provide username and quiz key',
                username: req.body.username
            })
        }

        dbOperations.checkQuiz(quizKey).then(async result => {
            dbOperations.checkPlayerName(username).then(async result => {
                if (result !== null) {
                    return res.render('index', {
                        message: 'That email is already in use',
                        username: req.body.username,
                    });
                    await dbOperations.createPlayer(username, quizKey);
                    res.redirect(307, '/index');
                    // return res.render('index', {
                    //     message: 'User registered'
                    // });
                } else if (result === null || !(await bcrypt.compare(quizKey, result[0].quizKey))) {
                    res.status(401).render('index', {
                        message: 'Quiz key is incorrect',
                        username: req.body.username
                    })
                } else {
                    const id = result[0].quizKey;

                    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    res.header('auth-token', token);

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookieOptions);
                    res.status(200).redirect("quiz");
                }
            });
        })


    } catch (error) {
        console.log(error);
    }
}