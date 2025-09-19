// server.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const connectDB = require("./database/connect.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Detect environment
const isProduction = process.env.NODE_ENV === "production";

console.log("Environment:", isProduction ? "Production" : "Development");
console.log("Frontend URL:", isProduction ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL_DEV);

// Init Express
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: isProduction ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL_DEV,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// --- API Routes ---
const authRoutes = require("./api/auth.js");
app.use("/api/auth", authRoutes);

// Test API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

// Serve built React frontend in production
if (isProduction) {
  app.use(express.static(path.join(__dirname, "public")));

  // Catch-all for SPA routing
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
