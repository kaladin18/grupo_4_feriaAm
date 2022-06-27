const express = require("express");
const productApiController = require("../../controllers/api/productApiController");
const router = express.Router();

router.get("/", productApiController.list);
router.get("/:id", productApiController.detail)


module.exports = router;