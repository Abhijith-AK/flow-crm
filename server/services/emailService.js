const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

const sendMail = async (to, subject, html) => {
    const mailOptions = {
        from: {
            name: "Flow CRM",
            address: process.env.EMAIL_USER,
        },
        to, // FIX: Use the function parameter
        subject,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId); 
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendMail;

