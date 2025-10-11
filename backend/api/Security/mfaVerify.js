const express = require("express");
const router = express.Router();
const User = require("../../database/Maria/Models/User.js");
const verifyAccessToken = require("./verifyTokenBackend.js");
const speakeasy = require("speakeasy");

// POST /api/mfa/verify
router.post("/verify", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { token } = req.body;

    if (!token) return res.status(401).json({ message: "Token is required" });
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.mfaSecret) return res.status(401).json({ success: false, message: "MFA is not set up for this user" });

    // Verify the TOTP token
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) return res.status(401).json({ success: false, message: "Invalid token" });

    user.mfaEnabled = true;
    await user.save();

    res.status(200).json({ message: "MFA enabled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
