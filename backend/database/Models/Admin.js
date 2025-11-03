const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  mdbCampaignID: Number,
  mdbUserID: Number,
  mdbListID: Number,
  contactList: Array,
  template: String,
  status: String
});

module.exports = mongoose.model("Admin", adminSchema);

