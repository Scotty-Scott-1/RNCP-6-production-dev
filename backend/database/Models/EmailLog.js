const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema({
  campaign: String,
  contactID: String,
  contactName: String,
  email: String,
  sentAt: { type: Date, default: Date.now },
  clicked: { type: Boolean, default: false },
  clickedAt: Date,
  credentialsSubmitted: { type: Boolean, default: false },
  submittedAt: Date,
  template: String,
  meta: { type: mongoose.Schema.Types.Mixed, default: {} }
});

module.exports = mongoose.model("EmailLog", emailLogSchema);
