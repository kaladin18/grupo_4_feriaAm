function loggedUserMiddleware (req, res, next) {
    res.locals.isLogged = false;
    if (req.session.loggedUser) {
        res.locals.isLogged = true;
        res.locals.currentUser = req.session.loggedUser;
    }
    next();
}

module.exports = loggedUserMiddleware;