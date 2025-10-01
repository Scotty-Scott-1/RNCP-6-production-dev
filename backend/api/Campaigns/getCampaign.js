const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js")

router.get("/get/:filter", verifyAccessToken, async (req, res) => {
  try {;
    const userId = req.user.id;
    const filter = req.params.filter.toLowerCase();

    let query = { createdBy: userId };

    if (filter && filter !== "all") {
      query.status = filter;
    }

    const campaigns = await Campaign.find(query).populate("mailingList");


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
