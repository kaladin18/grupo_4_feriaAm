const express = require("express");
const usersController = require("../../controllers/users/usersController");
const fileUpload = require("../../middlewares/userImageUpload");
const formValidation = require("../../middlewares/formValidation");
const router = express.Router();

//REGISTER
router.get("/register", usersController.register);
router.post("/register", fileUpload.single("userImage"), formValidation, usersController.registerProcess);
//LOGIN
router.get("/login", usersController.login);
router.post("/login", usersController.loginProcess);




module.exports = router;
