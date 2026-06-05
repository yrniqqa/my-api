import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from:    process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};

export const newMessageNotification = (msg) => ({
  to:      process.env.EMAIL_USER,
  subject: `New message from ${msg.name}`,
  html: `
    <h2>New portfolio message</h2>
    <p><strong>From:</strong> ${msg.name} (${msg.email})</p>
    <p><strong>Subject:</strong> ${msg.subject || "No subject"}</p>
    <p><strong>Message:</strong></p>
    <p>${msg.message}</p>
  `,
});

export const replyEmail = (to, name, replyBody) => ({
  to,
  subject: "Re: Your message to Hagenimana Abraham",
  html: `
    <p>Hi ${name},</p>
    <p>${replyBody}</p>
    <br/>
    <p>Best regards,<br/>Hagenimana Abraham</p>
  `,
});
