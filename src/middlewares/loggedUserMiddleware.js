const User = require("../models/User");




function loggedUserMiddleware (req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField("email", emailInCookie);

    if (userFromCookie) {
        delete userFromCookie.password;
        req.session.loggedUser = userFromCookie;
    }
    if (req.session.loggedUser) {
        res.locals.isLogged = true;
        res.locals.currentUser = req.session.loggedUser;
    }
   

    next();
}

module.exports = loggedUserMiddleware;