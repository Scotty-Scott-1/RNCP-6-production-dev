const express = require("express");
const MailingList = require("../../database/Models/MailingList.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

router.delete("/:listid/:contactid/delete", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const listId = req.params.listid;
    const contactId = req.params.contactid;

    const list = await MailingList.findOne({ _id: listId, createdBy: userId });
    if (!list) return res.status(404).json({ message: "Mailing list not found" });

    list.contacts = list.contacts.filter(c => c._id.toString() !== contactId);

    await list.save();

    return res.status(200).json({ contacts: list.contacts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
