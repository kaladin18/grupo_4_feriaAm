const db = require("../database/models");
const sequelize = db.sequelize;

function loggedUserMiddleware(req, res, next) {
  res.locals.isLogged = false;
  let emailInCookie = req.cookies.userEmail;
  if (emailInCookie) {
    db.Seller.findOne({ where: { email: req.cookies.userEmail } }).then(
      (userFromCookie) => {
          delete userFromCookie.password;
          req.session.loggedUser = userFromCookie;
          
      }
    );
  }
  if (req.session.loggedUser) {
    res.locals.isLogged = true;
    res.locals.currentUser = req.session.loggedUser;
  }
  next();
}

module.exports = loggedUserMiddleware;
