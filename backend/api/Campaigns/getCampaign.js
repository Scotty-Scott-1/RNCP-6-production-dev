const express = require("express");
const Campaign = require("../../database/Maria/Models/Campaign.js");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js")

router.get("/get/:filter", verifyAccessToken, async (req, res) => {
  try {;
    const userId = req.user.id;

    const campaigns = await Campaign.findAll({ where: { createdBy: userId }, include: [MailingList] });

    res.json(campaigns.map(list => list.toJSON()));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
