const express = require("express");
const registerController = require("../../controllers/users/registerController");
const fileUpload = require("../../middlewares/userImageUpload");
const formValidation = require("../../middlewares/formValidation");
const router = express.Router();



router.get("/", registerController.main);
router.post("/", fileUpload.single("userImage"), formValidation, registerController.register);
router.get("/success", registerController.registerSuccess);
module.exports = router;
