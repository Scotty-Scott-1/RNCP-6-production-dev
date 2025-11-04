const express = require("express");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();
const Admin = require("../../database/Models/Admin");
const Campaign = require("../../database/Maria/Models/Campaign.js");

router.get("/admin/check/reqs", verifyAccessToken, async (req, res) => {
  try {
    const campaign = await Admin.findOne({
      mdbUserID: req.user.id,
      status: "launched",
      userNotified: false,
    });

    if (!campaign) {
      return res.status(200).json({ message: "Nothing to notify" });
    }

    // Mark the user as notified
    campaign.userNotified = true;
    await campaign.save();

    console.log("___________________________________");
    console.log("Mongo campaign ID:", campaign.mdbCampaignID);
    console.log("___________________________________");

    // Find the related MariaDB campaign
    const MDBcampaign = await Campaign.findOne({
      where: { id: campaign.mdbCampaignID },
    });

    if (MDBcampaign) {
      await MDBcampaign.update({
        emailsSent: campaign.emailsSent,
        emailsFailed: campaign.emailsFailed,
		status: "launched"
      });
    } else {
      console.warn(`No MariaDB campaign found for ID ${campaign.mdbCampaignID}`);
    }

    return res.status(200).json({ message: "A campaign has been authorised" });

  } catch (err) {
    console.error("Error in /admin/check/reqs:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

