const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js"); // Sequelize model
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

router.post("/new", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Create a new mailing list linked to the user
    const list = await MailingList.create({
      ...req.body,
      createdBy: userId
    });

    console.log(list.toJSON());
    res.status(201).json(list);

  } catch (error) {
    console.error("Error creating mailing list:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
