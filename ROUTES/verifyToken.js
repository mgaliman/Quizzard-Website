const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
  const authcookie = req.cookies.jwt;

  jwt.verify(authcookie, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      res.render('index');
    }
    else if (data.id) {
      req.user = data.id
      next();
    }
  })
}