const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  mdbCampaignID: Number,
  mdbUserID: Number,
  mdbListID: Number,
  contactList: Array,
  template: String,
  status: String,
  emailsSent: Number,
  emailsFailed: Number,
  userNotified: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("Admin", adminSchema);
