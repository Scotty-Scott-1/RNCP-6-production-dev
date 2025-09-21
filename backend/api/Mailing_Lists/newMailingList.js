const express = require("express");
const MailingList = require("../../database/Models/MailingList.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js");
const router = express.Router();

router.post("/new", verifyAccessToken, async (req, res) => {
	try {
		const userId = req.user.id;
		const list = new MailingList({
			...req.body,
  			createdBy: userId
		});
		await list.save();
		console.log(list);
		res.status(201).json(list);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
