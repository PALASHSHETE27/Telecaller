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

import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.BREVO_EMAIL,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw error;
  }
};