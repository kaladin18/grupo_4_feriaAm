const fs = require("fs");
const path = require("path");
const Product = require("../../models/Product");

module.exports = {
  list: function (req, res) {
    listaProductos = Product.findAll();
    res.render("products/productsList", {
      title: "Productos",
      productList: listaProductos,
    });
  },
  cart: function (req, res) {
    let loggedUser = req.session.loggedUser;
    let cart = Product.getCartData(loggedUser.id);
    res.render("products/productCart", { title: "Tu carrito", data: cart });
  },
  addToCart: function (req, res) {
    producToAdd = req.body;
    console.log(productToAdd);
    let loggedUser = req.session.loggedUser;
    Product.addToCart(productToAdd, loggedUser.id);
    res.redirect("/");
  },
  detail: function (req, res) {
    let allProducts = Product.findAll();
    let data = Product.findByPK(req.params.id);
    res.render("products/productDetail", {
      title: "Detalle de producto",
      data: data,
      lista: data.size,
      productData: allProducts,
    });
  },
  create: function (req, res) {
    res.render("products/productCreate", { title: "Subir nuevo producto" });
  },
  createProcess: function (req, res) {
    let productData = req.body;
    let product = {
      ...productData,
      image: req.file.filename,
    };
    Product.create(product);
    res.redirect("/users/profile")
  }, 
  edit: function (req, res) {
    let data = Product.findByPK(req.params.id);
    res.render("products/productEdit", {
      title: "Edición de producto",
      data: data,
    });
  },
  editProcess: function (req, res) {
    Product.edit(req.body);

    res.redirect("/products/db/" + req.body.productID);
  },
  deleteProcess: function (req, res) {
    listaProductos = Product.findAll().filter(function (producto) {
      return producto.id != "" + req.params.id;
    });
    escribirJSON(listaProductos);
    res.redirect("/products");
  },
};
