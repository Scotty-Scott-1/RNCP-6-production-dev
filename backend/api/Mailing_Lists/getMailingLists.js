const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js"); // Sequelize model
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

// GET all mailing lists owned by the authenticated user
router.get("/get", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all mailing lists for this user
    const mailingLists = await MailingList.findAll({
      where: { createdBy: userId }
    });

    // Convert Sequelize instances to plain objects
    res.json(mailingLists.map(list => list.toJSON()));

  } catch (err) {
    console.error("Error fetching mailing lists:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
