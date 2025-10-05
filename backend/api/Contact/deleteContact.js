const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const Contact = require("../../database/Maria/Models/Contact.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    if (!id) return res.status(400).json({ message: "Missing required fields" });

    const contact = await Contact.findOne({ where: { id } });
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const mailingListID = contact.mailingListId;
    const mailingList = await MailingList.findOne({ where: { id: mailingListID, createdBy: userId } });
    if (!mailingList) return res.status(404).json({ message: "Mailing list not found or not authorized" });

    await Contact.destroy({where: { id: contact.id } });

    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
