const sendMail2 = require("./resendMailer.js");

const sendStartupEmail = async () => {
  try {
    await sendMail2({
      to: "6799@holbertonstudents.com",
      subject: "🚀 Test Email on App Startup",
      text: "This is a test email sent when the app starts.",
      html: "<strong>This is a test email sent when the app starts.</strong>",
    });
    console.log("📨 Startup email sent successfully!");
  } catch (err) {
    console.error("📨 Startup email failed to send:", err);
  }
};

module.exports = sendStartupEmail;
