const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js");

router.post("/one", verifyAccessToken, async (req, res) => {
  try {
	const campaignID = req.body.campaignID;
	console.log("The campaign id passed is", campaignID);

    const userId = req.user.id;
	console.log("The user id passed is", userId);

    const campaign = await Campaign.findOne({ _id: campaignID });

	if (campaign.createdBy === userId) {
		console.log("Campaign was created by this user")
		res.json(campaign);
	} else {
		res.status(500).json({ message: "error" });
	}

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
