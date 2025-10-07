const express = require("express");
const Campaign = require("../../database/Maria/Models/Campaign.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const router = express.Router();

router.put("/:id/complete", verifyAccessToken, async (req, res) => {
	try {
		const campaignID = req.params.id;
		const userID = req.user.id;

		const [updatedCount] = await Campaign.update(
			{ status: "completed" },
			{ where: { id: campaignID, createdBy: userID } }
		);

		if (updatedCount === 0) {
			return res.status(404).json({ message: "Campaign not found" });
		}


		console.log("----------COMPLETE CAMPAIGN-----------");
		console.log("User id: ", userID);
		console.log("User name: ", req.user.username);
		console.log("Campaign ID: ", campaignID );
		console.log("Deleted Count: ", updatedCount);
		console.log("----------COMPLETE CAMPAIGN-----------");


		res.status(200).json({ message: "Campaign completed" });
	} catch (error) {
		console.error("Error completing campaign:", error);
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
