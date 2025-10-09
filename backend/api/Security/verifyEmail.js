const express = require("express");
const User = require("../../database/Maria/Models/User.js");
const router = express.Router();
const { Op } = require('sequelize');

router.put("/email", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Verification token missing" });

    const user = await User.findOne({
      where: {
        verificationToken: token,
        tokenExpiry: { [Op.gt]: new Date() },
        isVerified: false
      }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.isVerified = true;
    user.verificationToken = null;
    user.tokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
