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
    db.Seller.findOrCreate({
      where: {email: req.body.email},
      defaults: {
        name: req.body.name,
        last_name: req.body.lastName,
        image: req.file.filename,
        birthday: req.body.birthday,
        password: encryptPassword(req.body.password)
      }
    }).then(([newUser, created]) => {
      if (!created) {
        res.render("users/register", {
          title: "Error en la registración",
          errors: {
            email: {
              msg: "Este email ya se encuentra registrado"}
          },
          oldData: oldData
        })
      }
      res.render("users/registerSuccess", {
        title: "Bienvenido!",
        newUserName: newUser.name,
      });
    })
    
  },
  
 
  //LOGIN
  login: function (req, res) {
    res.render("users/login", { title: "Iniciar sesión" });
  },

  //proceso del login
  loginProcess: function (req, res) {
    let oldData = req.body;
    let userToLogin = User.findByField("email", req.body.email);
    if (userToLogin) {
      if (comparePasswords(req.body.password, userToLogin.password)) {
        delete userToLogin.password;
        req.session.loggedUser = userToLogin;

        if (req.body.rememberMe) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
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
  },

  //Perfil
  userProfile: function (req, res) {
    res.render("users/userProfile", { title: "Tu perfil" });
  },

  //Logout
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();
    res.locals.currentUser = null;
    return res.redirect("/");
  },
};
