const express = require("express");
const EmailLog = require("../../database/Models/EmailLog.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");

const router = express.Router();

// POST /api/email-log
router.post("/", verifyAccessToken, async (req, res) => {
  try {
		

    if (!campaignId || !contactId || !email || !template) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newLog = await EmailLog.create({
      campaignId,
      contactId,
      email
    });

    res.status(201).json({ message: "Email log created", log: newLog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
