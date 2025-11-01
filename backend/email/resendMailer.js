require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail2 = async ({ to, subject, text, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Verification <verification@training.fraiseberry.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || text,
    });

    if (error) {
      console.error("❌ [Service: Resend] Error sending email:", error);
	  throw error;
    } else {
      console.log("✅ [Service: Resend]. Email successfully sent:", data.id);
	  return data;
    }
  } catch (err) {
    console.error("❌ [Service: Resend] Error sending email:", err);
	throw err;
  }
};

module.exports = sendMail2;
