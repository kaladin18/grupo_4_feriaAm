const { body } = require("express-validator");
const path = require("path");

const validations = [
    body("name")
    .notEmpty().withMessage("Tenes que escribir tu nombre"),

    body("lastName")
    .notEmpty().withMessage("Tenes que escribir tu apellido"),

    body("email")
    .notEmpty().withMessage("Tenes que escribir tu correo")
    .isEmail().withMessage("Ingresa un formato de correo válido"),
    
    body("birthday")
    .notEmpty().withMessage("Se requiere la fecha de nacimiento"),

    body("userType")
    .notEmpty().withMessage("Elija un tipo de cuenta"),

    

    body("userImage").custom((value, { req }) => {
        let file = req.file;
        
        let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
        
        if (!file) {
            throw new Error("Tienes que subir una imagen")
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(", ")}`);
            }
        }
        
        return true;
    }),

    body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false})
      .withMessage("la contraseña debe contener al menos 8 caracteres, de los cuales debe haber al menos una minuscula, una mayúscula y un número"),

    body("rePassword")
    .notEmpty().withMessage("Debe repetir la contraseña"),
    body('rePassword').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contraseñas no coinciden');
        }
        return true;
      })


]

module.exports = validations;