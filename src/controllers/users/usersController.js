const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const User = require("../../models/User");
const db = require("../../database/models");
const sequelize = db.sequelize;

let encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

let comparePasswords = (password, ecryptedPassword) => {
  return bcrypt.compareSync(password, ecryptedPassword);
};

module.exports = {
  //Register
  register: function (req, res) {
    res.render("users/register", { title: "Registrate gratis" });
  },

  registerProcess: function (req, res) {
    let errors = validationResult(req);
    let oldData = req.body;
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        title: "Error en la registracion",
        errors: errors.mapped(),
        oldData: oldData,
      });
    }
    let userCreate = db.Buyer;
    if (req.body.userType == "seller") {
      userCreate = db.Seller;
    }
    userCreate
      .findOrCreate({
        where: { email: req.body.email },
        defaults: {
          name: req.body.name,
          last_name: req.body.lastName,
          image: req.file.filename,
          birthday: req.body.birthday,
          password: encryptPassword(req.body.password),
        },
      })
      .then(([newUser, created]) => {
        if (!created) {
          return res.render("users/register", {
            title: "Error en la registracion",
            errors: {
              email: {
                msg: "Este email ya está registrado",
              },
            },
            oldData: oldData,
          });
        }
        res.render("users/registerSuccess", {
          title: "Bienvenido!",
          newUserName: req.body.name,
        });
      });
  },

  //LOGIN
  login: function (req, res) {
    res.render("users/login", { title: "Iniciar sesión" });
  },

  //proceso del login
  loginProcess: function (req, res) {
    let oldData = req.body;
    let userType = db.Buyer;
    if (req.body.userType == "seller") {
      userType = db.Seller;
    }
    userType
      .findOne({ where: { email: req.body.email } })
      .then((userToLogin) => {
        if (userToLogin) {
          if (comparePasswords(req.body.password, userToLogin.password)) {
            delete userToLogin.password;
            req.session.loggedUser = userToLogin;
            req.session.loggedUserType = req.body.userType;

            if (req.body.rememberMe) {
              res.cookie("userEmail", req.body.email, {
                maxAge: 1000 * 60 * 60,
              });
              res.cookie("userType", req.body.userType, {
                maxAge: 1000 * 60 * 70,
              });
            }
            return res.redirect("/");
          }
          return res.render("users/login", {
            errors: {
              password: {
                msg: "La contraseña es incorrecta",
              },
            },
            oldData: oldData,
          });
        }
        return res.render("users/login", {
          errors: {
            email: {
              msg: "Este email no se encuentra registrado",
            },
          },
        });
      });
  },

  //Perfil
  userProfile: function (req, res) {
    res.render("users/userProfile", { title: "Tu perfil" });
  },
  editUserData: function (req, res) {
    let errors = validationResult(req);
    let oldData = req.session.loggedUser;
    if (!errors.isEmpty()) {
      return res.render("users/userDetail", {
        title: "Error en la registracion",
        errors: errors.mapped(),
        oldData: oldData,
      });
    }
    res.render("users/editUserData", {
      title: "Editá tus datos",
      oldData: oldData,
    });
  },

  updateProfile: function (req, res) {
    newData = req.body;
    let userEdit = db.Buyer;
    if (req.session.loggedUserType == "seller") {
      userEdit = db.Seller;
    }
    userEdit
      .update(
        {
          name: newData.name,
          last_name: newData.last_name,
          birthday: newData.birthday,
        },
        { where: { id: req.session.loggedUser.id } }
      )
      .then(() => {
        userEdit
          .findOne({ where: { id: req.session.loggedUser.id } })
          .then((updatedUser) => {
            req.session.loggedUser = updatedUser;
            res.redirect("/users/profile");
          });
      });
  },

  editPassword: function (req, res) {
    res.render("users/editPassword");
  },

  updatePassword: function (req, res) {
    let userEdit = db.Buyer;
    if (req.session.loggedUserType == "seller") {
      userEdit = db.Seller;
    }
    userEdit
      .update(
        {
          password: encryptPassword(req.body.password),
        },
        { where: { id: req.session.loggedUser.id } }
      )
      .then(() => {
        res.redirect("/users/profile");
      });
  },

  //Logout
  logout: function (req, res) {
    res.clearCookie("userEmail");
    res.clearCookie("userType");

    req.session.destroy();
    res.locals.currentUser = null;
    
    res.redirect("/");
  },
};
