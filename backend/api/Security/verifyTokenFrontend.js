const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

/*POST ROUTE TO CHECK ACCESS TOKEN: Receives an access token from the client and verifies its validity with secret key*/
router.post("/api/checkaccess", (req, res) => {
  const { token } = req.body;
  /*IF NO TOKEN PROVIDED: If no token is provided, respond with 401 Unauthorized*/
  if (!token) {
    return res.status(403).json({ valid: false, message: "No token provided" });
  }
  /*TRY VERIFYING TOKEN: Verify the token using the secret key. If valid, respond with valid: true, otherwise respond with 403 Forbidden*/
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    return res.status(200).json({ valid: true, message: "Token is valid" });
  } catch (err) {

	if (err.name === "TokenExpiredError")
	{
		return res.status(401).json({ valid: false, message: "token expired" });
	}

    return res.status(403).json({ valid: false, message: "Invalid token" });
  }
});

module.exports = router;
