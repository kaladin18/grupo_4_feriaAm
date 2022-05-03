const db = require("../database/models");
const sequelize = db.sequelize;

function productSellerAuthMiddleware(req, res, next) {
  let loggedUser = req.session.loggedUser;
  db.Product.findByPk(req.params.id).then((product) => {
    if (loggedUser.id != product.seller_id) {
      return res.redirect("/");
    }
  });

  next();
}

module.exports = productSellerAuthMiddleware;
