const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: "No token provided" });

  if (!process.env.JWT_SECRET) console.log("❌ [Express]: File: verifyTokenBackend.js | Info: .env is not available");
  if (process.env.JWT_SECRET) console.log("✅ [Express]: File: verifyTokenBackend.js | Info: .env is available");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyAccessToken;
