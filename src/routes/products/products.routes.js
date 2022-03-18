const express = require("express");
const productsController = require("../../controllers/products/productsController");
const router = express.Router();



router.get("/", productsController.main);
router.get("/product-cart", productsController.cart);
router.get("/create", productsController.create);

module.exports = router;