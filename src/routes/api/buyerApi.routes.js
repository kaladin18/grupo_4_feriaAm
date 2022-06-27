const express = require("express");
const buyerApiController = require("../../controllers/api/buyerApiController");
const router = express.Router();

router.get("/", buyerApiController.list);
router.get("/:id", buyerApiController.detail);




module.exports = router;