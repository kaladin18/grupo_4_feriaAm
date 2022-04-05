function guestMiddleware(req, res, next) {
    if (req.session.loggedUser) {
        return res.redirect("/");
    }
    next();
}


module.exports = guestMiddleware;