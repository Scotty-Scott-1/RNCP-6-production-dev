const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
	campaignName: String,
	description: String,
	startTime: String,
	endTime: String,
	mailingList: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "MailingList",  // Reference to MailingList model
		required: true
	},
	emailSenderName: String,
	emailTemplate: String,
	landingPageTemplate: String,
	landingPage: Boolean,
	createdBy: String
}, { versionKey: false });

module.exports = mongoose.model("Campaign", campaignSchema);
