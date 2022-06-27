

function isSellerMiddleware(req, res, next) {
  if (req.session.loggedUserType == "buyer") {
      console.log("esta andando?");
      return res.redirect("/");
  }


  next();
}

module.exports = isSellerMiddleware;
