const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Professional Email Template Generator
const getEmailTemplate = (title, content, isAutoReply = false) => `
    <div style="font-family: 'Inter', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 32px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);">
        <!-- Header Banner -->
        <div style="background: #0f172a; padding: 50px 20px; text-align: center; border-bottom: 4px solid #3b82f6;">
            <h1 style="color: #3b82f6; margin: 0; font-size: 32px; letter-spacing: 3px; text-transform: uppercase; font-weight: 900;">AIMS <span style="color: #ffffff; font-style: italic;">BHUBANESWAR</span></h1>
            <p style="color: #94a3b8; margin-top: 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 5px; font-weight: 800;">Institute of Medical Sciences</p>
        </div>

        <!-- Featured Banner Image -->
        <div style="width: 100%; position: relative; background-color: #0f172a;">
            <img src="https://images.unsplash.com/photo-1631815587646-b62243973434?auto=format&fit=crop&q=80&w=1200" alt="AIMS Admission Open" style="width: 100%; height: auto; display: block; filter: brightness(0.8);" />
            <div style="background: linear-gradient(to top, #0f172a, transparent); position: absolute; bottom: 0; left: 0; right: 0; height: 60px;"></div>
        </div>

        <!-- Content Area -->
        <div style="padding: 40px; color: #334155; position: relative;">
            <div style="position: absolute; top: -30px; right: 40px; background: #3b82f6; color: #ffffff; padding: 12px 24px; border-radius: 14px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);">Admissions 2026-27</div>
            
            <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 25px; tracking: -0.5px;">${title}</h2>
            <div style="line-height: 1.8; font-size: 16px; color: #475569;">
                ${content}
            </div>
            
            ${isAutoReply ? `
            <div style="margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 20px; border-left: 6px solid #3b82f6;">
                <p style="margin: 0; font-size: 15px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 1px;">What Happens Next?</p>
                <div style="margin-top: 20px; color: #64748b; font-size: 14px; font-weight: 500;">
                    <p style="margin-bottom: 12px; display: flex; align-items: center;">✅ Our Counselor will call you within 24 hours.</p>
                    <p style="margin-bottom: 12px; display: flex; align-items: center;">📝 Document verification link will be shared.</p>
                    <p style="margin: 0; display: flex; align-items: center;">🏢 You are invited for a physical campus visit.</p>
                </div>
            </div>

            <div style="margin-top: 40px; text-align: center;">
                <p style="font-size: 14px; font-weight: 600; color: #64748b; margin-bottom: 15px;">Have immediate questions?</p>
                <a href="tel:+919437090875" style="display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 14px; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);">Connect With Support</a>
            </div>
            ` : ''}
        </div>

        <!-- Footer -->
        <div style="background-color: #0f172a; padding: 40px; text-align: center; color: #ffffff;">
            <p style="margin: 0; font-size: 12px; font-weight: 900; color: #3b82f6; text-transform: uppercase; letter-spacing: 2px;">Thank you for choosing AIMS</p>
            <p style="margin: 15px 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                Bhatakhuri, Gangapada, Bhubaneswar – 752054<br/>
                Odisha, India
            </p>
            <div style="margin: 25px 0; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);">
                <a href="https://aims-medical.com" style="color: #ffffff; text-decoration: none; font-size: 11px; margin: 0 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Official Website</a>
            </div>
            <p style="margin: 0; font-size: 10px; color: #475569; font-weight: 500;">© 2026 Ayush Institute of Medical Sciences. All Rights Reserved.</p>
        </div>
    </div>
`;

// Helper to send email
const sendInquiryEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 1. Email to Admin
    const adminMailOptions = {
        from: `"AIMS Admin Alerts" <${process.env.EMAIL_USER}>`,
        to: process.env.RECEIVER_EMAIL || 'aimsbbsrsupport@gmail.com',
        subject: `🚨 New Inquiry: ${data.name} (${data.category})`,
        html: getEmailTemplate(
            "New Student Inquiry Received",
            `
            <p><strong>Student Name:</strong> ${data.name}</p>
            <p><strong>Apply For:</strong> ${data.category}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Query:</strong></p>
            <p style="font-style: italic; color: #64748b;">"${data.message}"</p>
            `
        )
    };

    // 2. Auto-Reply to Student
    const userMailOptions = {
        from: `"AIMS Admissions" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: `Thank you for connecting with AIMS Institute!`,
        html: getEmailTemplate(
            `Hi ${data.name.split(' ')[0]}, Welcome to AIMS!`,
            `
            <p>Thank you for showing interest in our <strong>${data.category}</strong> program. We have received your inquiry and our academic counselor will get in touch with you shortly.</p>
            <p>At AIMS, we are committed to providing world-class pharmaceutical education with advanced laboratory training and 100% placement support.</p>
            `,
            true // Enable Auto-Reply sections
        )
    };

    // Send both
    await transporter.sendMail(adminMailOptions);
    return transporter.sendMail(userMailOptions);
};

// POST route
router.post('/inquiry', async (req, res) => {
    const { name, email, phone, category, message } = req.body;
    try {
        await sendInquiryEmail({ name, email, phone, category, message });
        res.status(200).json({
            success: true,
            message: "Inquiry Sent! Thank you for connecting with AIMS."
        });
    } catch (err) {
        console.error("Mail Dispatch Error:", err);
        res.status(500).json({
            success: false,
            message: `Mail Error: ${err.message}. Check backend console for details.`
        });
    }
});

module.exports = router;
