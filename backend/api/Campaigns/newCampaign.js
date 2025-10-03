const express = require("express");
const Campaign = require("../../database/Maria/Models/Campaign.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const router = express.Router();

router.post("/new", verifyAccessToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const campaign = await Campaign.create({
      ...req.body,
      createdBy: userId,
      status: "active",
    });

		console.log(campaign);
		res.status(201).json(campaign);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});


module.exports = router;
