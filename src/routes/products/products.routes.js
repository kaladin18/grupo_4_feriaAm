const express = require("express");
const productsController = require("../../controllers/products/productsController");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();



router.get("/", productsController.list);
router.get("/cart", productsController.cart);
router.get("/existing/:id", productsController.detail);
//creacion y edicion de productos
router.get("/create", authMiddleware, productsController.create);
router.get("/existing/:id/edit", authMiddleware, productsController.editView);
router.put("/:id", productsController.editPUT);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;