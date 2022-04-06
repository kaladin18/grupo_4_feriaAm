const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/usersController");

//Middlewares
const fileUpload = require("../../middlewares/userImageUpload");
const formValidation = require("../../middlewares/formValidation");
const guestMiddleware = require("../../middlewares/guestMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");


//REGISTER
router.get("/register", guestMiddleware, usersController.register);
router.post("/register", fileUpload.single("userImage"), formValidation, usersController.registerProcess);
//LOGIN
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersController.loginProcess);
//Perfil
router.get("/profile", authMiddleware, usersController.userProfile);
//LOGOUT
router.get("/logout", authMiddleware, usersController.logout);




module.exports = router;
