const express = require("express");
const MailingList = require("../../database/Models/MailingList.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

// Add contact to mailing list
router.put("/addcontact", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const { id, contact } = req.body;

    if (!id || !contact || !contact.email || !contact.name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find mailing list and check ownership
    const mailingList = await MailingList.findById(id);
    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found" });
    }

    if (mailingList.createdBy !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this list" });
    }

    // Add new contact
    mailingList.contacts.push(contact);

    await mailingList.save();

    res.status(200).json(mailingList); // return updated mailing list
  } catch (error) {
    console.error("Add contact error:", error);
    res.status(500).json({ message: "Server error adding contact" });
  }
});

module.exports = router;
