const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  mdbCampaignID: Number,
  mdbUserID: Number,
  mdbListID: Number,
  contactList: Array,
  template: String
});

module.exports = mongoose.model("Admin", adminSchema);

