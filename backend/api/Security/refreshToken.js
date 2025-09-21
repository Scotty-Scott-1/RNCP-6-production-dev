// rncp6/DB/Routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshsecret";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

router.post("/refresh", (req, res) => {

  const httpOnlyToken = req.cookies.refreshToken;

  if (!httpOnlyToken) return res.status(403).json({ message: "No token http only token provided" });

  try {
    const payload = jwt.verify(httpOnlyToken, JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id, username: payload.username },
      JWT_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({
      message: "Token refreshed",
      accessToken: newAccessToken
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(403).json({ message: "Invalid or expired refresh token. Sign in again"});
  }

});

module.exports = router;
