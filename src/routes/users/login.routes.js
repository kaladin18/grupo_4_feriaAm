const express = require("express");
const loginController = require("../../controllers/users/loginController");
const router = express.Router();

router.get("/", loginController.main);

module.exports = router;
