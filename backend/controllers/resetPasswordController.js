const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Reset password using the reset token
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Reset token and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long"
      });
    }

    const user = await User.findOne({
      resetToken: token
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid reset token"
      });
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();

      return res.status(400).json({
        message: "Reset token has expired"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Password reset successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Password reset failed",
      error: error.message
    });
  }
};

module.exports = {
  resetPassword
};