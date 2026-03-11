require('dotenv').config();
const nodemailer = require('nodemailer');

const testMail = async () => {
    console.log("Checking Environment Variables...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS.includes('#')) {
        console.error("ERROR: EMAIL_PASS is empty or contains comments. Please set a valid Gmail App Password.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log("SUCCESS: Connection to Gmail established!");
    } catch (err) {
        console.error("FAILURE: Could not connect to Gmail.");
        console.error("Error Code:", err.code);
        console.error("Error Command:", err.command);
        console.error("Error Details:", err.message);
        console.log("\n--- TROUBLESHOOTING ---");
        console.log("1. Go to Google Account > Security.");
        console.log("2. Enable 2-Step Verification.");
        console.log("3. Create an 'App Password' (not your regular login password).");
        console.log("4. Paste that 16-character code in .env file.");
    }
};

testMail();
