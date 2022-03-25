const express = require("express");
const productsController = require("../../controllers/products/productsController");
const router = express.Router();



router.get("/", productsController.list);
router.get("/cart", productsController.cart);
router.get("/create", productsController.create);
router.get("/:id/edit", productsController.edit);
router.get("/:id", productsController.detail);
module.exports = router;