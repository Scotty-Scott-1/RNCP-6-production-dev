const express = require("express");
const MailingList = require("../../database/Models/MailingList.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js")

// GET all mailing lists owned by the authenticated user
router.get("/get", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const mailingLists = await MailingList.find({ createdBy: userId });
    res.json(mailingLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
