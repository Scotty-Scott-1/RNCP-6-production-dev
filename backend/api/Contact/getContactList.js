const express = require("express");
const  MailingList = require("../../database/Maria/Models/MailingList.js");
const  Contact = require("../../database/Maria/Models/Contact.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

router.get("/contact/:id", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const mailingListId = req.params.id;

    // Check if the mailing list exists and belongs to the user
    const mailingList = await MailingList.findOne({
      where: { id: mailingListId, createdBy: userId },
    });

    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found or not authorized" });
    }

    // Fetch all contacts for this mailing list
    const contacts = await Contact.findAll({
      where: { mailingListId },
      attributes: ["id", "name", "lastName", "email", "department", "role"],
    });

    res.status(200).json(contacts); // return array of contact objects
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error fetching contacts" });
  }
});

module.exports = router;
