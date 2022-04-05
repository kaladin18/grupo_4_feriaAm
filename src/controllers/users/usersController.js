const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const User = require("../../models/User");

let encryptPassword = (password) => {
     return bcrypt.hashSync(password, 10);
}

let comparePasswords = (password, ecryptedPassword) => {
     return bcrypt.compareSync(password, ecryptedPassword);
}





module.exports = {
    //Register
    register: function(req, res) {
        res.render("users/register", { title: 'Registrate gratis' });
    },

    registerProcess: function(req, res) {
        let errors = validationResult(req)
        let oldData = req.body;
        if (!errors.isEmpty()){
            return res.render("users/register", ({title: "Error en la registracion", errors: errors.mapped(), oldData: oldData}));
        }
        let userInDB = User.findByField("email", req.body.email);

        if (userInDB) {
            return res.render("users/register", ({title: "Error en la registracion", errors: {
                email: {
                    msg: "Este email ya está registrado"
                }
            }, oldData: oldData}));
        }


        let userData = req.body;
        let user = {
            ...userData,
            password: encryptPassword(userData.password),
            image: req.file.filename
        };
        delete user.rePassword;
        User.create(user);
        res.render("users/registerSuccess", { title: 'Bienvenido!', newUserName: userData.name});
    },
    
    //LOGIN
    login: function(req, res) {
        res.render("users/login", { title: 'Iniciar sesión' });
    },
    
    //proceso del login
    loginProcess: function(req, res) {
        let oldData = req.body;
        let userToLogin = User.findByField("email", req.body.email);
        if (userToLogin) {
           if (comparePasswords(req.body.password, userToLogin.password)){
              return res.redirect("/");
           }
           return res.render("users/login", {
            errors: {
                password: {
                    msg: "La contraseña es incorrecta"
                }
            },
            oldData: oldData
        });
        }
        return res.render("users/login", {
            errors: {
                email: {
                    msg: "Este email no se encuentra registrado"
                }
            }
        });
    }
        
    
}
