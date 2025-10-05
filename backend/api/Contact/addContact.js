const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const Contact = require("../../database/Maria/Models/Contact.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

// Add contact to mailing list
router.post("/contact", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, contact } = req.body;

    if (!id || !contact || !contact.email || !contact.name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check mailing list ownership
    const mailingList = await MailingList.findOne({ where: { id, createdBy: userId } });
    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found or not authorized" });
    }

    // Create new contact
    const newContact = await Contact.create({
      ...contact,
      mailingListId: mailingList.id,
    });

    // Return the new contact
    const returnedContact = {
      id: newContact.id,
      name: newContact.name,
      lastName: newContact.lastName,
      email: newContact.email,
      department: newContact.department,
      role: newContact.role,
    };

    res.status(201).json(returnedContact);
  } catch (error) {
    console.error("Add contact error:", error);
    res.status(500).json({ message: "Server error adding contact" });
  }
});

module.exports = router;

