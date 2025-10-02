const express = require("express");
const Joi = require("joi");
const User = require("../../database/Models/User");
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

  // check constraints
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // check is email exists already
  const email = req.body.email;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

module.exports = router;
