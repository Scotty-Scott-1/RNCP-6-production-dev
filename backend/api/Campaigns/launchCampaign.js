const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const MailingList = require("../../database/Models/MailingList.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const sendMail = require("../../email/mailer.js")
const router = express.Router();

router.post("/launch", verifyAccessToken, async (req, res) => {
	try {
		const userID = req.user.id;
		const listID = req.body.listid;
		const campaignID = req.body.id;
		const template = req.body.template;

		console.log("LAUNCH");
		console.log("User ID: ", userID);
		console.log("Campign ID: ", campaignID);
		console.log("List ID: ", listID);
		console.log("Template: ", template);

		const myList = await MailingList.findOne({ _id: listID });
		const myCampiagn = await Campaign.findOne({ _id: campaignID });
		const contacts = myList.contacts;

		



		for (contact of contacts) {
			console.log(contact.name, contact.email);
			const info = {
				to: `${contact.email}`,
				subject: ``,
				text: "Anyone want to play table tennis or fooseball? Join here: https://example.com", // fallback for clients that can't read HTML
				html: `
					Anyone want to play table tennis or fooseball?
					<br/><br/>
					<a href="https://example.com" target="_blank">Click here to join</a>
				`
			};
			sendMail(info);
		}

		res.status(200).json({ message: "y" });

	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});


module.exports = router;
