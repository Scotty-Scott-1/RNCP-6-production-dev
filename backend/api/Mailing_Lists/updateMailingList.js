const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

router.put("/update", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id; // from token
    const { id, listName, description } = req.body;

    if (!id || !listName || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const mailingList = await MailingList.findByPk(id);
    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found" });
    }

    if (mailingList.createdBy !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this list" });
    }

    mailingList.listName = listName;
    mailingList.description = description;

    await mailingList.save();

    res.status(200).json({ message: "Mailing list updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error updating mailing list" });
  }
});

module.exports = router;
