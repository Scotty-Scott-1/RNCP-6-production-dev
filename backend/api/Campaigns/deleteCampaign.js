const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const router = express.Router();

router.delete("/:id", verifyAccessToken, async (req, res) => {
	try {
		const userId = req.user.id;
		const campaignId = req.params.id;

		console.log("User ID: ", userId);
		console.log("Campaign ID: ", campaignId);;
		await Campaign.findByIdAndDelete(campaignId);
		res.status(200).json({ message: "Campaign deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


module.exports = router;
