const express = require("express");
const authService = require("../../services/auth.service");
const authController = require("../../controllers/auth.controller")

const router = express.Router();

router.post(
  "/login",
  authService.passport.authenticate("local"),
  authController.loginSuccess
);

router.post("/logout", authController.logout)
router.post("/register", authController.register);



module.exports = router;
