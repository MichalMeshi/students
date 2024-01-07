const nodemailer = require("nodemailer");

const sendEmail = async (options, senderEmail,htmlContent) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${senderEmail}`, // Use the sender's email as the "from" address
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.htmlContent   // This will include the HTML content in the email
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
