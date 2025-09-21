const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

/*Receives an access token from react and verifies it with secret key*/
router.post("/frontend", (req, res) => {
  const { token } = req.body;
  /*If no token is provided, respond with 401 Unauthorized*/
  if (!token) {
    return res.status(403).json({ valid: false, message: "No token provided" });
  }

  console.log("Checking if .env is accessible...");
  if (!process.env.JWT_SECRET) {
    console.log(".env is not available")
  } else {
    console.log(!process.env.JWT_SECRE);
  }





  /*Verify the token using the secret key*/
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
