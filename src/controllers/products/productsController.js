const fs = require("fs");
const path = require("path");

let listaProductos = JSON.parse(fs.readFileSync (path.join(__dirname, "../../data/products.json"), "utf-8"));

module.exports = {
    main: function(req, res) {
        res.render("products/products", { title: 'Productos', productList: listaProductos });
    },
    cart: function(req, res) {
        res.render("products/productCart", { title: 'Tu carrito' });
    },
    create: function(req, res) {
        res.render("products/productCreate", { title: "Subir nuevo producto" });
    }
}
