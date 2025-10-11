// rncp6/DB/Routes/mfa.js
const express = require("express");
const router = express.Router();
const User = require("../../database/Maria/Models/User.js");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
const verifyAccessToken = require("../Security/verifyTokenBackend.js"); // existing function

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshsecret";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;


router.post("/mfa", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { mfaInput } = req.body;

    if (!mfaInput) {
      return res.status(400).json({ message: "MFA code is required" });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.mfaSecret) {
      return res.status(400).json({ message: "MFA is not set up for this user" });
    }

    // Verify the TOTP code
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token: mfaInput,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ message: "Invalid MFA code" });
    }

	// Create JWTs
	const accessToken = jwt.sign(
	  { id: user.id, username: user.username },
	  JWT_SECRET,
	  { expiresIn: "15m" }
	);

	const refreshToken = jwt.sign(
	  { id: user.id, username: user.username },
	  JWT_REFRESH_SECRET,
	  { expiresIn: "7d" }
	);

	// Set refresh token cookie
	res.cookie("refreshToken", refreshToken, {
	  httpOnly: true,
	  secure: true,
	  sameSite: "None",
	  maxAge: SEVEN_DAYS,
	  path: "/",
	});

    res.status(200).json({
      message: "MFA verified successfully!",
      accessToken
    });
  } catch (err) {
    console.error("MFA verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
