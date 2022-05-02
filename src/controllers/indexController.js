const db = require("../database/models");
const Product = require("../models/Product");

module.exports = {
  index: function (req, res) {
    db.Product.findAll({ limit: 4 }).then((productData) => {
      res.render("index", {
        title: "Bienvenidos a la Feria",
        productData: productData,
      });
    });
  },
};
