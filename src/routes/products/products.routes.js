const express = require("express");
const productsController = require("../../controllers/products/productsController");
const router = express.Router();



router.get("/", productsController.list);
router.get("/cart", productsController.cart);
router.get("/create", productsController.create);
router.get("/edit", productsController.edit);
router.get("/detail", productsController.detail);
module.exports = router;