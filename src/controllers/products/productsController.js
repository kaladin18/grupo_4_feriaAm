const db = require("../../database/models");
const sequelize = db.sequelize;
const { Op } = require("sequelize");


module.exports = {
  list: function (req, res) {
    db.Product.findAll({where: {
      seller_id: req.session.loggedUser.id
    }},{
      include: [{ association: "vendedor" }, { association: "categoria" }],
    }).then((products) => {
      res.render("products/productsList", {
        title: "Productos",
        productList: products,
        isSeller: true
      });
    });
  },
//! FALTA CAMBIAR PARA QUE TRABAJE CON SEQUELIZE
  // cart: function (req, res) {
  //   let loggedUser = req.session.loggedUser;
  //   let cart = Product.getCartData(loggedUser.id);
  //   res.render("products/productCart", { title: "Tu carrito", data: cart });
  // },
  // addToCart: function (req, res) {
  //   producToAdd = req.body;
  //   console.log(productToAdd);
  //   let loggedUser = req.session.loggedUser;
  //   Product.addToCart(productToAdd, loggedUser.id);
  //   res.redirect("/");
  // },
  detail: function (req, res) {
    db.Product.findByPk(req.params.id, {
      include: [{ association: "categoria" }, { association: "vendedor" }],
    }).then((data) => {
      res.render("products/productDetail", {
        title: "Detalle de producto",
        data: data,
      });
    });
  },
  create: function (req, res) {
    res.render("products/productCreate", { title: "Subir nuevo producto" });
  },
  createProcess: function (req, res) {
    let productData = req.body;
    db.Category.create({
      state: productData.productState,
      class: productData.productClass,
      age_group: productData.productAgeGroup,
      subclass: productData.productSubClass,
      color: productData.productColor,
      size: productData.productSize,
      stock: productData.productStock,
    })
      .then((newCategory) =>
        db.Product.create({
          name: productData.productName,
          description: productData.productDescription,
          price: productData.productPrice,
          seller_id: req.session.loggedUser.id,
          category_id: newCategory.id,
          image: req.file.filename,
        })
      )
      .then(() => res.redirect("/users/profile"));
  },
  edit: function (req, res) {
    db.Product.findByPk(req.params.id, {
      include: [{ association: "categoria" }, { association: "vendedor" }],
    }).then((data) =>
      res.render("products/productEdit", {
        title: "Edición de producto",
        data: data,
      })
    );
  },
  editProcess: function (req, res) {
    newData = req.body;
    console.log(newData);
    db.Category.update(
      {
        state: newData.productState,
        class: newData.productClass,
        age_group: newData.productAgeGroup,
        subclass: newData.productSubClass,
        color: newData.productColor,
        size: newData.productSize,
        stock: newData.productStock,
      },
      { where: { id: newData.categoryID } }
    )
      .then(() => {
        db.Product.update(
          {
            name: newData.productName,
            description: newData.productDescription,
            price: newData.productPrice,
          },
          {
            where: { id: req.params.id },
          }
        );
      })
      .then(() => {
        res.redirect("/products/db/" + req.params.id);
      });
  },

  //! EL DELETE ES PERMANENTE POR AHORA
  deleteProcess: function (req, res) {
    db.Product.findByPk(req.params.id).then((productToDelete) => {
      db.Category.destroy({ where: { id: productToDelete.category_id } });
    })
    .then(() => {
      res.redirect("/products");
    })
  },
  search: function (req, res) {
    db.Product.findAll({where: {
      name: {
        [Op.like]: "%" + req.query.query + "%"
      }
    } },{
      include: [{ association: "vendedor" }, { association: "categoria" }],
    }).then((products) => {
      res.render("products/productsList", {
        title: "Resultado de busqueda",
        productList: products,
        isSeller: false
      });
    });
}
}