const express = require("express");
const EmailLog = require("../../database/Models/EmailLog.js");
const { now } = require("mongoose");

const router = express.Router();

// POST /api/email-log/clicked/:logid
router.post("/submit/:logid", async (req, res) => {
  try {
	const { logid } = req.params;

	// Find the email log and update clicked field
	const emailLog = await EmailLog.findByIdAndUpdate(logid,{ credentialsSubmitted: true, submittedAt: new Date() }, { new: true });

	if (!emailLog) {
	  return res.status(404).json({ message: "Email log not found" });
	}

	console.log(`Email log ${logid} marked as credentials submitted.`);
	res.status(200).json({ message: "sumbission recorded"});
  } catch (error) {
	console.error(error);
	res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
