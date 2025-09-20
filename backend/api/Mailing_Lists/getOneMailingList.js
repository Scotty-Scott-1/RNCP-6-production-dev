const express = require("express");
const MailingList = require("../../database/Models/MailingList.js"); // your mailing list model
const router = express.Router();
const verifyAccessToken = require("../Security/verifyTokenBackend.js");

// GET all mailing lists owned by the authenticated user
router.post("/one", verifyAccessToken, async (req, res) => {
  try {
	const listID = req.body.listID;
	console.log("The list id passed is", listID);

    const userId = req.user.id;
	console.log("The user id passed is", userId);

    const list = await MailingList.findOne({ _id: listID });

	if (list.createdBy === userId) {
		console.log("List was created by this user")
		res.json(list);
	} else {
		res.status(500).json({ message: "error" });
	}

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
