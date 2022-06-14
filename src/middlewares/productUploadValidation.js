const { body } = require("express-validator");
const path = require("path");
const validations = [
  body("productName")
    .notEmpty()
    .withMessage("Tenes que escribir el nombre del producto")
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres"),

  body("productDescription")
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),

  body("userType").notEmpty().withMessage("Elija un tipo de cuenta"),

  body("productImage").custom((value, { req }) => {
    let file = req.file;

    let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones de archivos permitidas son ${acceptedExtensions.join(
            ", "
          )}`
        );
      }
    }

    return true;
  }),

  body("productState").notEmpty().withMessage("Este campo no debe estar vacío"),
  body("productClass").notEmpty().withMessage("Este campo no debe estar vacío"),
  body("productSubClass")
    .notEmpty()
    .withMessage("Este campo no debe estar vacío"),
  body("productAgeGroup")
    .notEmpty()
    .withMessage("Este campo no debe estar vacío"),
  body("productPrice").notEmpty().withMessage("Tenes que escribir un precio"),
  body("productSize").notEmpty().withMessage("Este campo no debe estar vacío"),
  body("productSize").custom((value, { req }) => {
    let talle = req.productSize;
    let tallesValidos = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];
    if ((talle < 1 && talle > 60) || !tallesValidos.includes(talle)) {
      throw new Error("Tenés que escribir un talle válido");
    }
  }),
];

module.exports = validations;
