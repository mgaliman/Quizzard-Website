const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const authcookie = req.cookies.game;

    jwt.verify(authcookie, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.redirect('/EnterNick');
        }
        else if (data.id) {
            req.user = data.id
            console.log(req.user);
            next();
        }
    })

}