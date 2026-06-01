

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_EMAIL) {
      throw new Error("Missing Brevo env variables");
    }

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Telecaller OTP",
          email: "noreply@telecallerproject.online",
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,

        // ✅ helps deliverability (important)
        textContent: "Your OTP email requires HTML support.",
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("✅ Email sent via Brevo API:", response.data.messageId);
    return true;

  } catch (err) {
    console.error(
      "❌ Email failed:",
      err.response?.data || err.message
    );
    return false;
  }
};