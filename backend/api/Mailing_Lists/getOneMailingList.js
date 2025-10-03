const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js");

// GET one mailing list by ID
router.get("/get/:id", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;         // authenticated user
    const listId = req.params.id;       // ID from the URL

    // Find the mailing list owned by this user
    const list = await MailingList.findOne({
      where: { id: listId, createdBy: userId }
    });

    if (!list) {
      return res.status(404).json({ message: "Mailing list not found" });
    }

    res.json(list.toJSON());

  } catch (err) {
    console.error("Error fetching mailing list:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
