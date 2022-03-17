const express = require("express");
const registerController = require("../../controllers/users/registerController");
const router = express.Router();

router.get("/", registerController.main);
router.post("/success", registerController.success);
module.exports = router;
