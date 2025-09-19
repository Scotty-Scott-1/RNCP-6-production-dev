const mongoose = require("mongoose");

const mailingListSchema = new mongoose.Schema({
  listName: String,
  description: String,
  createdBy: String,
  contacts: [
    {
      name: String,
	  lastName: String,
      email: String,
      department: String,
      role: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

module.exports = mongoose.model("MailingList", mailingListSchema);
