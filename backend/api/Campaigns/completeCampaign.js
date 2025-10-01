const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const router = express.Router();

router.put("/complete/:id", verifyAccessToken, async (req, res) => {
	try {
		const campaignId = req.params.id;
		await Campaign.findByIdAndUpdate(campaignId, { status: "completed"}, { new: true });
		res.status(200).json({ message: "Campaign completed" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
