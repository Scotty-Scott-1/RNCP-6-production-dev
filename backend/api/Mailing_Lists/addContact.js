const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const Contact = require("../../database/Maria/Models/Contact.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

// Add contact to mailing list
router.post("/addcontact", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, contact } = req.body;

    if (!id || !contact || !contact.email || !contact.name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find mailing list and check ownership
    const mailingList = await MailingList.findOne({ where: { id, createdBy: userId } });
    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found or not authorized" });
    }

    // Create new contact linked to this mailing list
    const newContact = await Contact.create({
      ...contact,
      mailingListId: mailingList.id,
    });

    // Fetch only contacts for this mailing list
    const contacts = await Contact.findAll({
      where: { mailingListId: mailingList.id },
      attributes: ["id", "name", "lastName", "email", "department", "role"],
    });

    res.status(200).json(newContact); // return list of contact objects
  } catch (error) {
    console.error("Add contact error:", error);
    res.status(500).json({ message: "Server error adding contact" });
  }
});

module.exports = router;
