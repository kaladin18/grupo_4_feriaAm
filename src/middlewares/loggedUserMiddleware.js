const db = require("../database/models");
const sequelize = db.sequelize;

function loggedUserMiddleware(req, res, next) {
  res.locals.isLogged = false;
  let emailInCookie = req.cookies.userEmail;
  let userTypeInCookie = req.cookies.userType;
  if (emailInCookie && userTypeInCookie) {
    let userType = db.Buyer;
    if (userTypeInCookie == "seller") {
      userType = db.Seller;
    } 
    userType.findOne({ where: { email: req.cookies.userEmail } }).then(
      (userFromCookie) => {
          delete userFromCookie.password;
          req.session.loggedUser = userFromCookie;
          req.session.loggedUserType = userTypeInCookie;
          
      }
    );
  }
  if (req.session.loggedUser) {
    res.locals.isLogged = true;
    res.locals.currentUser = req.session.loggedUser;
    res.locals.currentUserType = req.session.loggedUserType;
  }
  next();
}

module.exports = loggedUserMiddleware;
