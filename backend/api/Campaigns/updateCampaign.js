const express = require("express");
const Campaign = require("../../database/Maria/Models/Campaign.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

router.put("/:id", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { campaignName, description } = req.body;

    // Find the campaign
    const myCampaign = await Campaign.findOne({
      where: { id, createdBy: userId },
    });

    if (!myCampaign) {
      return res.status(404).json({ message: "Campaign not found or not authorized" });
    }

    // Update campaign
    await myCampaign.update({
      campaignName,
      description,
    });

    res.status(200).json({ message: "Campaign updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error updating campaign" });
  }
});

module.exports = router;
