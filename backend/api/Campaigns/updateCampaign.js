const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

// Update mailing list
router.put("/update", verifyAccessToken, async (req, res) => {
	try {

		const userId = req.user.id;
		const campaignId = req.body.id;
		console.log("USERID:", userId);
		console.log("campiagnID:", campaignId);
		const { campaignName, description } = req.body;

		const myCampaign = await Campaign.findById(campaignId);

		if (!myCampaign) {
			return res.status(404).json({ message: "Campaign not found" });
    }

    if (myCampaign.createdBy !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this campaign" });
    }

		// Update values
		myCampaign.campaignName = campaignName;
		myCampaign. description = description;

    await myCampaign.save();

    res.status(200).json({message: "updated"});
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error updating campaign list" });
  }


});

module.exports = router;
