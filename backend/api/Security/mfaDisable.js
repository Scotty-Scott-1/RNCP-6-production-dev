const express = require("express");
const router = express.Router();
const User = require("../../database/Maria/Models/User.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");

// POST /api/mfa/disable
router.post("/disable", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Disable MFA
    user.mfaEnabled = false;
    user.mfaSecret = null;
    await user.save();

    res.status(200).json({ message: "MFA disabled successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
