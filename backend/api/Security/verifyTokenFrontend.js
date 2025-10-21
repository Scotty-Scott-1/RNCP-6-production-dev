const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/frontend", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ valid: false, message: "No token provided" });
  }

  console.log("Checking if .env is accessible...");
  if (!process.env.JWT_SECRET) {
    console.log(".env is not available")
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    return res.status(200).json({ valid: true, message: "Token is valid" });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ valid: false, message: "token expired" });
    }
    return res.status(403).json({ valid: false, message: "Invalid token" });
  }
});

module.exports = router;
