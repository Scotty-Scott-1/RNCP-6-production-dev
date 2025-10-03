// server.js
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const sequelize = require('./database/Maria/connect.js');
const initDB = require("./database/Maria/initDB.js");

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
initDB();

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

const completeCampaign = require("./api/Campaigns/completeCampaign.js");
app.use("/api/campaign", completeCampaign);

const updateCampaign = require("./api/Campaigns/updateCampaign.js");
app.use("/api/campaign", updateCampaign);

const newMailingList = require("./api/Mailing_Lists/newMailingList.js");
app.use("/api/mailinglist", newMailingList);

const getMailingLists = require("./api/Mailing_Lists/getMailingLists.js");
app.use("/api/mailinglist", getMailingLists);

const getOneMailingList = require("./api/Mailing_Lists/getOneMailingList.js");
app.use("/api/mailinglist", getOneMailingList);

const updateMailingList = require("./api/Mailing_Lists/updateMailingList.js");
app.use("/api/mailinglist", updateMailingList);

const addContactMailingList = require("./api/Mailing_Lists/addContact.js");
app.use("/api", addContactMailingList);

const securityFrontend = require("./api/Security/verifyTokenFrontend.js");
app.use("/api/security", securityFrontend);

const securityRefresh = require("./api/Security/refreshToken.js");
app.use("/api/security", securityRefresh);

const deleteCampaign = require("./api/Campaigns/deleteCampaign.js");
app.use("/api/campaign/delete", deleteCampaign);

const deleteMailingList = require("./api/Mailing_Lists/deleteMailingList.js");
app.use("/api/mailinglist", deleteMailingList);

const launchCampiagn = require("./api/Campaigns/launchCampaign.js");
app.use("/api/campaign", launchCampiagn);

const updateEmailLog = require("./api/Email_Log/updateEmailLog.js");
app.use("/api/emaillog", updateEmailLog);

const updateEmailLogCreds = require("./api/Email_Log/udpateEmailLogCreds.js");
app.use("/api/emaillog", updateEmailLogCreds);

const getEmailLogsClicked = require("./api/Email_Log/getEmailLogsClicked.js");
app.use("/api/emaillog", getEmailLogsClicked);

// Contacts
const deleteContact = require("./api/Mailing_Lists/deleteContact.js");
app.use("/api/mailinglist", deleteContact);

const getContactList = require("./api/Contact/getContactList.js");
app.use("/api", getContactList);



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
