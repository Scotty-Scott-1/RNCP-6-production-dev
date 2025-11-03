const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/frontend", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ valid: false, message: "No token provided" });
  }

  if (!process.env.JWT_SECRET) console.log("❌ [Express]: File: verifyTokenFrontend.js Info: .env is not available");
  if (process.env.JWT_SECRET) console.log("✅ [Express]: File: verifyTokenFrontend.js Info: .env is available");


  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, message: "Token is valid" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ valid: false, message: "token expired" });
    }
    return res.status(403).json({ valid: false, message: "Invalid token" });
  }
});

module.exports = router;
