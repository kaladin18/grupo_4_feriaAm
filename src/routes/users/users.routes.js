const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/usersController");

//Middlewares
const registerValidation = require("../../middlewares/registerValidation");
const shopRegisterValidation = require("../../middlewares/shopRegisterValidation");
const guestMiddleware = require("../../middlewares/guestMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
const { userImageUpload } = require("../../middlewares/imageUpload");

//REGISTER
router.get("/register", guestMiddleware, usersController.register);
router.post(
  "/register",
  userImageUpload.single("userImage"),
  registerValidation,
  usersController.registerProcess
);
//LOGIN
router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersController.loginProcess);
//Perfil
router.get("/profile", authMiddleware, usersController.userProfile);
//LOGOUT
router.get("/logout", authMiddleware, usersController.logout);

//Para tiendas
router.get("/shops/register", guestMiddleware, usersController.shopRegister);
router.post(
  "/shops/register",
  userImageUpload.single("userImage"),
  shopRegisterValidation,
  usersController.shopRegisterProcess
);

module.exports = router;
