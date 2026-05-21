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



import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT:", data.id);
    return data;
  } catch (error) {
    console.error("RESEND EMAIL ERROR:", error);
    throw error;
  }
};