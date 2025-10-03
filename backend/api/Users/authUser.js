// rncp6/DB/Routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../../database/Maria/Models/User.js");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "superrefreshsecret";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

// LOGIN ROUTE
router.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  console.log("Received login attempt:");

  try {
    // Find user by username
    const userToCheck = await User.findOne({ where: { username } });
    if (!userToCheck) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const isMatch = await userToCheck.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWTs
    const accessToken = jwt.sign(
      { id: userToCheck.id, username: userToCheck.username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: userToCheck.id, username: userToCheck.username },
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
      message: "Login successful",
      user: { id: userToCheck.id, username: userToCheck.username },
      accessToken,
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
