const fs = require("fs");
const path = require("path");
const Product = require("../../models/Product");

module.exports = {
    list: function(req, res) {
        listaProductos = Product.findAll();
        res.render("products/productsList", { title: 'Productos', productList: listaProductos });
    },
    cart: function(req, res) {
        res.render("products/productCart", { title: 'Tu carrito' });
    },
    detail: function(req, res) {
        let allProducts = Product.findAll();
        let data = Product.findByPK(req.params.id);
        res.render("products/productDetail", { title: "Detalle de producto", data: data, lista: data.size, productData: allProducts});
    },
    create: function(req, res) {
        res.render("products/productCreate", { title: "Subir nuevo producto" });
    },
    editView: function(req, res) {
        let data = Product.findByPK(req.params.id);
        res.render("products/productEdit", { title: "Edición de producto", data: data});
    },
    editPUT: function (req, res) {
        Product.edit(req.body);
        
        res.redirect("/products/"+ req.body.productID);
        
    },
    deleteProduct: function (req, res) {
        listaProductos = Product.findAll().filter(function(producto){
            return producto.id != "" + req.params.id;
        })
        escribirJSON(listaProductos);
        res.redirect("/products");
    }
    
}

