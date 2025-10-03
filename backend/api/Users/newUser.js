const express = require("express");
const Joi = require("joi");
const User = require("../../database/Maria/Models/User.js");
const router = express.Router();

const userSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.pattern.base": "First name can only contain letters"
    }),

  lastName: Joi.string()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.base": "Last name can only contain letters"
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
    .min(3)
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
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Company name is required"
    }),

  companyAddress: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
      "string.empty": "Company address is required"
    }),

  companyWebsite: Joi.string()
    .uri()
    .required()
    .messages({
      "string.uri": "Company website must be a valid URL",
      "string.empty": "Company website is required"
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

    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const user = await User.create(req.body);

    const { password, ...userData } = user.toJSON();
    res.status(201).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
