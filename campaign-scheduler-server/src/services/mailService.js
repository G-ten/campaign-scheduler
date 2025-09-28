const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = {
    async sendMail(to, subject, html) {
        return transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to,
            subject,
            html
        });
    }
}