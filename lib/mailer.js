import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ✅ **Send Verification Email**
export async function sendVerificationEmail(email, link) {
  const logoURL = `${process.env.APP_URL || "http://localhost:3000"}/buddy.svg`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f4f4f4; border-radius: 10px;">
      <div style="text-align: center; padding: 10px;">
        <img src="${logoURL}" alt="Helper Buddy Logo" style="width: 150px; margin-bottom: 20px;">
      </div>
      <div style="background: #fff; padding: 20px; border-radius: 10px; text-align: center;">
        <h2 style="color: #333;">Verify Your Email</h2>
        <p style="color: #555;">Click the button below to verify your email and activate your account.</p>
        <a href="${link}" style="display: inline-block; padding: 12px 24px; font-size: 16px; font-weight: bold; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Verify Email</a>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
        <p>©️ ${new Date().getFullYear()} Helper Buddy. All rights reserved.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Helper Buddy" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email - Helper Buddy",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}

// ✅ **Send Order Email to Employees**
export async function sendOrderEmail(emails, orderDetails) {
  const logoURL = `${process.env.APP_URL || "http://localhost:3000"}/buddy.svg`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f4f4f4; border-radius: 10px;">
      <div style="text-align: center; padding: 10px;">
        <img src="${logoURL}" alt="Helper Buddy Logo" style="width: 150px; margin-bottom: 20px;">
      </div>
      <div style="background: #fff; padding: 20px; border-radius: 10px; text-align: center;">
        <h2 style="color: #333;">New Order Assigned</h2>
        <p style="color: #555;">You have been assigned a new service request. Please review the details below:</p>
        <ul style="text-align: left; padding-left: 20px;">${orderDetails}</ul>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">Click the link to accept the job. Once accepted, it will no longer be available to others.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
        <p>©️ ${new Date().getFullYear()} Helper Buddy. All rights reserved.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Helper Buddy" <${process.env.SMTP_USER}>`,
    to: emails,
    subject: "New Service Request - Helper Buddy",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}