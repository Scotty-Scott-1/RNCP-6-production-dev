const express = require("express");
const MailingList = require("../../database/Models/MailingList.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const router = express.Router();

router.delete("/:id/delete", verifyAccessToken, async (req, res) => {
	try {
		const userID = req.user.id;
		const mailignListID = req.params.id;

		console.log("User ID: ", userID);
		console.log("Mailing List ID: ", mailignListID);

		await MailingList.findByIdAndDelete(mailignListID);

		res.status(200).json({ message: "List deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


module.exports = router;
