const express = require("express");
const productCartController = require("../../controllers/products/productCartController");
const router = express.Router();

router.get("/", productCartController.main);

module.exports = router;