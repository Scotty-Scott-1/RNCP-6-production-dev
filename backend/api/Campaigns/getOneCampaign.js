const express = require("express");
const Campaign = require("../../database/Maria/Models/Campaign.js");
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js");

router.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const campaign = await Campaign.findOne({ where: { id, createdBy: userId } });
    console.log("dsfdsfdsfds");
    console.log("campaign id is  ",id);
    console.log("user id is ",userId);
    console.log(campaign);

		res.json(campaign);
	} catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
