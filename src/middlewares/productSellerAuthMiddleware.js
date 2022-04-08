const Product = require("../models/Product");

function productSellerAuthMiddleware(req, res, next) {
  let loggedUser = req.session.loggedUser;
  let product = Product.findByPK(req.params.id);

  if (loggedUser.id != product.sellerID) {
    return res.redirect("/");
  }

  next();
}

module.exports = productSellerAuthMiddleware;
