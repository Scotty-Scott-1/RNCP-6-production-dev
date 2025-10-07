const express = require("express");
const Campaign = require("../../database/Maria/Models/Campaign.js");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js")

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    console.log(status);

    if (status === "Active") {
      const campaigns = await Campaign.findAll({ where: { createdBy: userId, status: "active" }, include: [MailingList] });
      return res.json(campaigns.map(list => list.toJSON()));
    }

    if (status === "Completed") {
      const campaigns = await Campaign.findAll({ where: { createdBy: userId, status: "completed" }, include: [MailingList] });
      return res.json(campaigns.map(list => list.toJSON()));

    }

    if (status === "Launched") {
      const campaigns = await Campaign.findAll({ where: { createdBy: userId, status: "launched" }, include: [MailingList] });
      return res.json(campaigns.map(list => list.toJSON()));
    }

      const campaigns = await Campaign.findAll({ where: { createdBy: userId }, include: [MailingList] });
      return res.json(campaigns.map(list => list.toJSON()));

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
