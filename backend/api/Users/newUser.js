const express = require("express");
const Joi = require("joi");
const User = require("../../database/Maria/Models/User.js");
const router = express.Router();
const crypto = require("crypto");
const sendMail2 = require("../../email/resendMailer.js")
let myUrl = "";


const userSchema = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(30)
    .pattern(/^[a-zA-Z'\-]+$/)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.pattern.base": "First name can only contain letters, hypthens and apostrophes"
    }),

  lastName: Joi.string()
    .min(1)
    .max(30)
    .pattern(/^[a-zA-Z'\-]+$/)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.base": "Last name can only contain letters, hypthens and apostrophes"
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required"
    }),

  username: Joi.string()
    .alphanum()
    .min(1)
    .max(20)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.alphanum": "Username can only contain letters and numbers"
    }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base": "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, 1 symbol"
    }),

  companyName: Joi.string()
    .min(1)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z'\-]+$/)
    .messages({
      "string.empty": "Company name is required",
      "string.pattern.base": "Company name can only contain letters, hypthens and apostrophes"
    }),

  companyAddress: Joi.string()
    .min(1)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z0-9\s',.-]+$/)
    .messages({
      "string.empty": "Company address is required",
      "string.pattern.base": "Company address can only contain letters, numbers, spaces, commas, periods, apostrophes, and hyphens"
    }),

  companyWebsite: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      "string.empty": "Company website is required",
    }),

  agree: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      "any.only": "You must agree to the terms"
    })

});

router.post("/new", async (req, res) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let existingVerifiedUser = await User.findOne({
      where: {
        isVerified: true,
        email: req.body.email
      }
    });
    if (existingVerifiedUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    existingVerifiedUser = await User.findOne({
      where: {
        isVerified: true,
        username: req.body.username
      }
    });
    if (existingVerifiedUser) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await User.create({
      ...req.body,
      isVerified: false,
      verificationToken,
      tokenExpiry,
    });

    if (process.env.NODE_ENV === "development") {
      myUrl = process.env.FRONTEND_URL_DEV;
    } else {
      myUrl = process.env.FRONTEND_URL_PROD;
    }

    if (user) {
      try {
        await sendMail2({
          to: user.email,
          subject: "Verify your account",
          text: `
            Hello ${user.firstName} ${user.lastName},

            Thanks for signing up for the simulator tool.

            Please verify your account by clicking the link below:

            ${myUrl}/emailverify?token=${verificationToken}

            Kind regards,
            Simulator
          `,
          html: `
            <p>Hello ${user.firstName} ${user.lastName},</p>
            <p>Thanks for signing up for the simulator tool.</p>
            <p>
              Please verify your account by clicking the link below:
            </p>
            <p>
              <a href="${myUrl}/emailverify?token=${verificationToken}">
                Verify your account
              </a>
            </p>
            <p>Kind regards,<br/>Simulator</p>
          `,
        });

        console.log("✉️ [New User] Account verification email sent successfully");
      } catch (err) {
        console.error("✉️ [New User] Tried and failed to send account verification email", err);
        res.status(500).json({ message: "Verification email failed to send" });
      }
    }

    const { password, ...userData } = user.toJSON();
    res.status(201).json(userData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
