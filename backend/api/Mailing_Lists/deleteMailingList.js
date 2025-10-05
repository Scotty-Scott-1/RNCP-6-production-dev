const express = require("express");
const MailingList = require("../../database/Maria/Models/MailingList.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const router = express.Router();

router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    const userID = req.user.id;
    const id = req.params.id;

    const mailingList = await MailingList.findOne({ where: { id, createdBy: userID } });
    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found or not authorized" });
    }

		await MailingList.destroy( {where: { id } } );

		res.status(200).json({ message: "List deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});


module.exports = router;
