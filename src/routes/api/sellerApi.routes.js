const express = require("express");
const sellerApiController = require("../../controllers/api/sellerApiController");
const router = express.Router();

router.get("/", sellerApiController.list);
router.get("/:id", sellerApiController.detail);

module.exports = router;