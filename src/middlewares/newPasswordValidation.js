const { body } = require("express-validator");
const path = require("path");

const validations = [
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })
    .withMessage(
      "la contraseña debe contener al menos 8 caracteres, de los cuales debe haber al menos una minuscula, una mayúscula y un número"
    ),

  body("rePassword").notEmpty().withMessage("Debe repetir la contraseña"),
  body("rePassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }),
];

module.exports = validations;
