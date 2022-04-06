const express = require("express");
const productsController = require("../../controllers/products/productsController");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();



router.get("/", productsController.list);
router.get("/cart", productsController.cart);
router.get("/db/:id", productsController.detail);
//creacion y edicion de productos
router.get("/create", authMiddleware, productsController.create);
router.get("/db/:id/edit", authMiddleware, productsController.editView);
router.put("/db/:id", productsController.editPUT);
router.delete("/db/:id", productsController.deleteProduct);

module.exports = router;