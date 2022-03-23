const fs = require("fs");
const path = require("path");

let listaProductos = JSON.parse(fs.readFileSync (path.join(__dirname, "../../data/products.json"), "utf-8"));

module.exports = {
    list: function(req, res) {
        res.render("products/productsList", { title: 'Productos', productList: listaProductos });
    },
    cart: function(req, res) {
        res.render("products/productCart", { title: 'Tu carrito' });
    },
    create: function(req, res) {
        res.render("products/productCreate", { title: "Subir nuevo producto" });
    },
    edit: function(req, res) {
        res.render("products/productEdit", { title: "Edición de producto" });
    },
    detail: function(req, res) {
        res.render("products/productDetail", { title: "Detalle de producto" });
    }
}

