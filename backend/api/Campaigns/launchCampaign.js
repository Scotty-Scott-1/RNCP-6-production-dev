const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const MailingList = require("../../database/Models/MailingList.js");
const EmailLog = require("../../database/Models/EmailLog.js");
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
		const contacts = myList.contacts;

		if (template === "voucher") {
			for (contact of contacts) {
				try {
					const emailLog = await EmailLog.create({
						campaign: campaignID,
						contact: contact._id,
						template: "voucher",
					});
					console.log("EmailLog created:", emailLog);
				} catch (err) {
					console.error("EmailLog creation error:", err);
				}

				const info = {
					to: `${contact.email}`,
					subject: `Claim a free voucher`,
					text: `
						Hi ${contact.name},

						Your organisation has gifted you a voucher.

						Click the link below to claim it:

						http://localhost:5173/claim/?logid=${emailLog._id}

						Kind regards,
						Rewards team.
					`,
					html: `
						Hi ${contact.name}, <br/><br/>
						Your organisation has gifted you a voucher.<br/><br/>
						Click <a href="http://localhost:5173/voucher/?logid=${emailLog._id}">here</a> to claim it.<br/><br/>
						Kind regards,<br/><br/>
						Rewards team.
				`
				};
				sendMail(info);
			}
		}
		if (template === "appraisal") {
			for (let contact of contacts) {
				const emailLog = await EmailLog.create({
					campaign: campaignID,
					contact: contact._id,
					template: "appraisal"
				})
				await emailLog.save();

				const info = {
					to: `${contact.email}`,
					subject: `Appraisal deadline`,
					text: `
						Hello ${contact.name} ${contact.lastName},

						Your annual appraisal is ready for review. Please acknowledge receipt by clicking the link below:

						http://localhost:5173/appraisal/?logid=${emailLog._id}

						Kind regards,
						HR team
					`,
					html: `
						Hello ${contact.name} ${contact.lastName}, <br/><br/>
						Your annual appraisal is ready for review. Please acknowledge receipt by clicking the link below:<br/><br/>
						<a href="http://localhost:5173/appraisal/?logid=${emailLog._id}">Your appraisal</a><br/><br/>
						Kind regards,<br/>
						HR team.
				`
				};
				await sendMail(info);
			}
		}
		res.status(200).json({ message: "y" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
