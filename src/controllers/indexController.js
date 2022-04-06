const Product = require("../models/Product");



module.exports = {
    index: function(req, res) {
        let productData = Product.getData();
        res.render("index", { "title": "Bienvenidos a la Feria", productData: productData});
    }
}
