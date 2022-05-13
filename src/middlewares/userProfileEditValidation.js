const { body } = require("express-validator");
const path = require("path");

const validations = [
  body("name").notEmpty().withMessage("Tenes que escribir tu nombre"),

  body("lastName").notEmpty().withMessage("Tenes que escribir tu apellido"),

  body("email")
    .notEmpty()
    .withMessage("Tenes que escribir tu correo")
    .isEmail()
    .withMessage("Ingresa un formato de correo válido"),

  body("birthday").notEmpty().withMessage("Se requiere la fecha de nacimiento"),


 

  
];

module.exports = validations;
