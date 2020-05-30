const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");
const authValidator = require("../util/validations/auth");

router.get("/login", authController.getLogin);

router.post("/login", authValidator.loginValidation, authController.postLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  authValidator.signUpValidation,
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
