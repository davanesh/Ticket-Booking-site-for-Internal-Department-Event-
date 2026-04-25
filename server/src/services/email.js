import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let transporter;

// Try configuring with real credentials, fallback to generic tester
const initializeMailer = async () => {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_SERVICE) {
        transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log('Nodemailer initialized with custom service.');
    } else {
        // Fallback to test account from Ethereal
        console.warn('WARN: Email configurations missing. Falling back to Ethereal Test Account.');
        let testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
        });
        console.log(`Nodemailer TEST initialized. User: ${testAccount.user}`);
    }
}

initializeMailer();

export const sendTicketEmail = async (toEmail, event, ticket) => {
    try {
        const mailOptions = {
            from: `"College Events" <${process.env.EMAIL_USER || 'no-reply@college.edu'}>`,
            to: toEmail,
            subject: `Your Ticket for ${event.title} is Confirmed!`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 20px; border-radius: 10px;">
                    <h1 style="color: #00e0ff;">Ticket Confirmation: ${event.title}</h1>
                    <p style="font-size: 16px;">Hello,</p>
                    <p style="font-size: 16px;">Your ticket for <strong>${event.title}</strong> has been successfully booked.</p>
                    
                    <div style="background-color: #1e1e1e; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 5px 0; color: #ff00ff;"><strong>Ticket ID:</strong> ${ticket.id}</p>
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
                        <p style="margin: 5px 0;"><strong>Location:</strong> ${event.location}</p>
                    </div>

                    <p style="font-size: 14px; color: #aaaaaa;">Please present this email at the event entrance.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        
        // Preview only available when sending through an Ethereal account
        if(info.messageId && !process.env.EMAIL_PASS) {
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }

        return true;
    } catch (error) {
        console.error('Email send failed:', error);
        return false;
    }
}
