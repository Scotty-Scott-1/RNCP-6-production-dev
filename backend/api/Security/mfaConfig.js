// backend/api/Security/mfaSetup.js
const express = require("express");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const User = require("../../database/Maria/Models/User.js");

const router = express.Router();

router.post("/setup", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const secret = speakeasy.generateSecret({
      name: `RNCP-6 (${user.email})`, // appears in Authenticator app
      length: 20,
    });

    user.mfaSecret = secret.base32;
    await user.save();

    const qrCode = await qrcode.toDataURL(secret.otpauth_url);

    return res.status(200).json({
      success: true,
      secret: secret.base32,
      qrCode: secret.otpauth_url,
    });
  } catch (err) {
    console.error("MFA setup error:", err);
    res.status(500).json({ message: "Failed to setup MFA" });
  }
});

module.exports = router;
