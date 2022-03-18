const express = require("express");
const adminController = require("../../controllers/users/adminController");
const router = express.Router();

router.get("/", adminController.main);
router.get("/create-product", adminController.create)

module.exports = router;
