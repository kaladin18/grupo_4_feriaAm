const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users/usersController");

//Middlewares
const registerValidation = require("../../middlewares/registerValidation");
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
router.get("/profile/detail", authMiddleware, usersController.editUserData);
router.put("/profile/detail", usersController.updateProfile);
router.get("/profile/detail/change-password", usersController.editPassword);
router.put("/profile/detail/change-password", usersController.updatePassword);
//LOGOUT
router.get("/logout", authMiddleware, usersController.logout);

module.exports = router;
