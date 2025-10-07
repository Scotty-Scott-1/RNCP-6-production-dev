const express = require("express");
const EmailLog = require("../../database/Models/EmailLog.js");
const { now } = require("mongoose");
const Campaign = require("../../database/Maria/Models/Campaign.js");

const router = express.Router();

router.post("/clicked/:logid", async (req, res) => {
  try {
    const { logid } = req.params;

    // Find the email log and update clicked field
    const emailLog = await EmailLog.findByIdAndUpdate(logid,{ clicked: true, clickedAt: new Date() }, { new: true });

    if (!emailLog) {
      return res.status(404).json({ message: "Email log not found" });
    }

    const campaignID = emailLog.campaign;

    const updatedCampaign = await Campaign.increment(
      { linksClicked: 1 },
      { where: { id: campaignID }, returning: true }
    );

    console.log(`Campaign ${campaignID} linked clicked updated.`);
    console.log(`Email log ${logid} marked as clicked.`);
    res.status(200).json({ message: "Clicked recorded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
