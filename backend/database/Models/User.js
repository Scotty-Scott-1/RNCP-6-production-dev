const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String,
	companyName: String,
	companyAddress: String,
	companyWebsite: String,
	agree: Boolean
}, { versionKey: false });

const SALT_ROUNDS = 10;

userSchema.pre("save", async function (next) {
	try {
		// Only hash the password if it has been modified or is new
		if (this.isModified("password")) {
			console.log("Hashing password before saving...");
			this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
			console.log("Password hashed successfully.");
		}
		next(); // Proceed with saving
	} catch (err) {
		next(err); // Pass errors to Mongoose
	}
});

userSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};



module.exports = mongoose.model("User", userSchema);
