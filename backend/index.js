// server.js
require("dotenv").config();
const path = require("path");
const express = require("express");
const connectDB = require("./database/connect.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Init
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Serve static frontend (React/Vite)
app.use(express.static(path.join(__dirname, "public")));

// --- API Routes ---
//const userRoutes = require("./DB/Routes/users");
const authRoutes = require("./api/auth.js");
/*const checkTokenRoutes = require("./DB/Routes/checkAccessToken");
const refreshTokenRoutes = require("./DB/Routes/refreshAccessToken");
const newcampaign = require("./DB/Routes/newCampaignRoute.js");
const getcampaign = require("./DB/Routes/getCampaignRoute.js");
const getMailingList= require("./DB/Routes/getMailingListRoute.js");
const newMailingList = require("./DB/Routes/newMailingListRoute.js");
const getOneMailingList= require("./DB/Routes/getOneMailingList.js");
const updateMailingList = require("./DB/Routes/updateMailingList.js");
const addcontact = require("./DB/Routes/addContact.js");
const getOneCampaign = require("./DB/Routes/getOneCampaign.js");
const updateCampaign= require("./DB/Routes/updateCampaign.js");*/

// Register routes with `/api` prefix
//app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
/*app.use("/api/checkToken", checkTokenRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/newcampaign", newcampaign);
app.use("/api/getcampaign", getcampaign);
app.use("/api/getMailingList", getMailingList);
app.use("/api/newMailingList", newMailingList);
app.use("/api/getOneMailingList", getOneMailingList);
app.use("/api/updateMailingList", updateMailingList);
app.use("/api/addcontact", addcontact);
app.use("/api/getOneCampaign", getOneCampaign);
app.use("/api/updateCampaign", updateCampaign);*/

// Example test API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express API!" });
});

// Catch-all route for SPA (React/Vite)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start HTTP server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
