const express = require("express");
const Campaign = require("../../database/Models/Campaign.js");
const MailingList = require("../../database/Models/MailingList.js");
const EmailLog = require("../../database/Models/EmailLog.js");
const verifyAccessToken = require("../Security/verifyTokenBackend.js")
const sendMail = require("../../email/mailer.js")
const router = express.Router();

router.post("/launch", verifyAccessToken, async (req, res) => {
  try {
    const userID = req.user.id;
    const { listid: listID, id: campaignID, template } = req.body;

    console.log("-------------LAUNCH------------------");
    console.log("User ID:", userID);
    console.log("Campaign ID:", campaignID);
    console.log("List ID:", listID);
    console.log("Template:", template);
    console.log("-------------LAUNCH------------------");

    const myList = await MailingList.findById(listID);
    if (!myList) {
      return res.status(404).json({ message: "Mailing list not found" });
    }

    const contacts = myList.contacts;
    let emailsSent = 0;
    let emailsFailed = 0;
    const errors = [];

    for (let contact of contacts) {
      try {
        const emailLog = await EmailLog.create({
          campaign: campaignID,
          contact: contact._id,
          template
        });

        console.log("EmailLog created:", emailLog);

        let info;
        if (template === "voucher") {
          info = {
            to: contact.email,
            subject: "Claim a free voucher",
            text: `
              Hi ${contact.name},

              Your organisation has gifted you a voucher.

              Click the link below to claim it:
              http://localhost:5173/claim?logid=${emailLog._id}

              Kind regards,
              Rewards team.
            `,
            html: `
              Hi ${contact.name}, <br/><br/>
              Your organisation has gifted you a voucher.<br/><br/>
              Click <a href="http://localhost:5173/claim?logid=${emailLog._id}">here</a> to claim it.<br/><br/>
              Kind regards,<br/><br/>
              Rewards team.
            `
          };
        } else if (template === "appraisal") {
          info = {
            to: contact.email,
            subject: "Appraisal deadline",
            text: `
              Hello ${contact.name} ${contact.lastName},

              Your annual appraisal is ready for review. Please acknowledge receipt by clicking the link below:

              http://localhost:5173/appraisal?logid=${emailLog._id}

              Kind regards,
              HR team
            `,
            html: `
              Hello ${contact.name} ${contact.lastName}, <br/><br/>
              Your annual appraisal is ready for review.<br/><br/>
              <a href="http://localhost:5173/appraisal?logid=${emailLog._id}">Your appraisal</a><br/><br/>
              Kind regards,<br/>
              HR team.
            `
          };
        } else if (template === "payroll") {
          info = {
            to: contact.email,
            subject: "Payroll Update",
            text: `
              Hello ${contact.name} ${contact.lastName},

              Please confirm that your bank account details are correct:

              http://localhost:5173/payroll?logid=${emailLog._id}

              Thank you,
              Payroll Team
            `,
            html: `
              Hello ${contact.name} ${contact.lastName}, <br/><br/>
              Please confirm your bank account details:<br/><br/>
              <a href="http://localhost:5173/payroll?logid=${emailLog._id}">Payroll Update</a><br/><br/>
              Thank you,<br/>
              Payroll Team
            `
          };
        }

        await sendMail(info);
        emailsSent++;
      } catch (err) {
        console.error("EmailLog or sendMail error:", err);
        errors.push({ contact: contact.email, error: err.message });
        emailsFailed++;
      }
    }

    if (errors.length > 0) {
      return res.status(207).json({
        message: "Some emails failed to send",
        errors
      });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(campaignID, { status: "launched", emailsSent: emailsSent, emailsFailed: emailsFailed },{ new: true });
    return res.status(200).json({ message: "All emails sent successfully" });

  } catch (err) {
    console.error("Launch error:", err);
    return res.status(500).json({ message: err.message });
  }
});


module.exports = router;

