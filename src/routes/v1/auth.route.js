const express = require("express");
const authService = require("../../services/auth.service");

const router = express.Router();

router.post(
  "/login",
  authService.passport.authenticate("local"),
  function (req, res) {
    console.log(req.baseUrl);
    return res.status(200).json({ message: "Logged in successfully." });
  }
);

module.exports = router;
