const path = require("path");
const multer = require("multer");

//configuracion multer para subir archivos
let fileUpload = {
  userImageUpload: multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/images/users"));
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}._img_${path.extname(file.originalname)}`);
      },
    }),
  }),

  productImageUpload: multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/images/products"));
      },
      filename: function (req, file, cb) {
        cb(null, `${Date.now()}._img_${path.extname(file.originalname)}`);
      },
    }),
  })
};

module.exports = fileUpload;
