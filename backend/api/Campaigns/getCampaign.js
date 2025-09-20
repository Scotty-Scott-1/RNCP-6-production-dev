const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js")

router.get("/get", verifyAccessToken, async (req, res) => {
  try {;
    const userId = req.user.id;
    const campaigns = await Campaign.find({ createdBy: userId }).populate("mailingList"); ;

    if (campaigns) {
      res.json(campaigns);
    }
    else {
      console.log("no campaigns found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
