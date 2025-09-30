const express = require("express");
const router = express.Router();
const EmailLog = require("../../database/Models/EmailLog.js");

router.get("/clicked/:campaignID", async (req, res) => {
  try {
    const { campaignID } = req.params;
    const logs = await EmailLog.find({
      campaign: campaignID,
      clicked: true
    })

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
