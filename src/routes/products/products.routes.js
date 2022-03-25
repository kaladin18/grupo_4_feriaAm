const express = require("express");
const productsController = require("../../controllers/products/productsController");
const router = express.Router();



router.get("/", productsController.list);
router.get("/cart", productsController.cart);
router.get("/:id", productsController.detail);
//creacion y edicion de productos
router.get("/create", productsController.create);
router.get("/:id/edit", productsController.editView);
router.put("/:id", productsController.editPUT)

module.exports = router;