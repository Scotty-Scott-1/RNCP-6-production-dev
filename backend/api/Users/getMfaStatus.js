const express = require("express");
const User = require("../../database/Maria/Models/User.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js");

router.get("/status", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });
	if (!user) return res.status(404).json({ message: "User not found" });
	return res.status(200).json( { mfaEnabled: user.mfaEnabled });
	} catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
