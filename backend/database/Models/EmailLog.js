const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  contact: { type: mongoose.Schema.Types.ObjectId, ref: "MailingList.contacts" },
  contactName: String,
  sentAt: { type: Date, default: Date.now },
  clicked: { type: Boolean, default: false },
  clickedAt: Date,
  credentialsSubmitted: { type: Boolean, default: false },
  submittedAt: Date,
  template: String
});

module.exports = mongoose.model("EmailLog", emailLogSchema);
