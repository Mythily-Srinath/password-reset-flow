const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword
} = require("../controllers/authController");

const {
  resetPassword
} = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;