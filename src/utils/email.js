// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, html }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     from: `"Telecaller App" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html
//   });
// };





import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Telecaller App",
          email: process.env.BREVO_EMAIL,
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000, // prevents hanging
      }
    );

    console.log("✅ Email sent via Brevo API");
    return true;
  } catch (err) {
    console.error("❌ Email failed:", err.response?.data || err.message);
    return false;
  }
};