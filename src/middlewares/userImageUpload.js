const path = require("path");
const multer = require("multer");

//configuracion multer para subir archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname,"../../public/images/users"));
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}._img_${path.extname(file.originalname)}`)
    }
})
let fileUpload = multer({storage: storage});


module.exports = fileUpload;