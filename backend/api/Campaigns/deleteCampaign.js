const express = require("express");
const Campaign = require("../../database/Maria/Models/Campaign.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const router = express.Router();

router.delete("/:id", verifyAccessToken, async (req, res) => {
	try {
		const campaignID = req.params.id;
		const userID = req.user.id;

		const deletedCount = await Campaign.destroy({
			where: { id: campaignID, createdBy: userID }
		});

		if (deletedCount === 0) {
			return res.status(404).json({ message: "Campaign not found" });
		}

		console.log("----------DELETE CAMPAIGN-----------");
		console.log("User id: ", userID);
		console.log("User name: ", req.user.username);
		console.log("Campaign ID: ", campaignID );
		console.log("Deleted Count: ", deletedCount);
		console.log("----------DELETE CAMPAIGN-----------");


		res.status(200).json({ message: "Campaign deleted" });
	} catch (error) {
		console.error("Error deleting campaign:", error);
		res.status(500).json({ message: error.message });
	}
});


module.exports = router;
