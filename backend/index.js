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
const authUser = require("./api/Users/authUser.js");
app.use("/api/user", authUser);

const newUser = require("./api/Users/newUser.js");
app.use("/api/user", newUser);

const getCampaign = require("./api/Campaigns/getCampaign.js");
app.use("/api/campaign", getCampaign);

const newCampaign = require("./api/Campaigns/newCampaign.js");
app.use("/api/campaign", newCampaign);

const getOneCampaign = require("./api/Campaigns/getOneCampaign.js");
app.use("/api/campaign/get", getOneCampaign);

const updateCampaign = require("./api/Campaigns/updateCampaign.js");
app.use("/api/campaign", updateCampaign);

const newMailingList = require("./api/Mailing_Lists/newMailingList.js");
app.use("/api/mailinglist", newMailingList);

const getMailingLists = require("./api/Mailing_Lists/getMailingLists.js");
app.use("/api/mailinglist", getMailingLists);

const getOneMailingList = require("./api/Mailing_Lists/getOneMailingList.js");
app.use("/api/mailinglist/get", getOneMailingList);

const updateMailingList = require("./api/Mailing_Lists/updateMailingList.js");
app.use("/api/mailinglist", updateMailingList);

const addContactMailingList = require("./api/Mailing_Lists/addContact.js");
app.use("/api/mailinglist", addContactMailingList);





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
