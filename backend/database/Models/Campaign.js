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
	template: String,
	createdBy: String,
	status: { type: String, default: "active" },
	emailsSent: { type: Number, default: 0 },
	emailsFailed: { type: Number, default: 0 },
	linksClicked: { type: Number, default: 0 },
	credentialsSumbitted: { type: Number, default: 0 }
}, { versionKey: false });

module.exports = mongoose.model("Campaign", campaignSchema);
