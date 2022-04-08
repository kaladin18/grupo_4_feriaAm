function authMiddleware(req, res, next) {
  if (!req.session.loggedUser) {
    return res.redirect("/users/login");
  }
  next();
}

module.exports = authMiddleware;
