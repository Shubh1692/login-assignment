(function () {
    const nodemailer = require("nodemailer"),
        { serverDebugger, errorDebugger } = require("../config/debug"),
        { SMTP_USER, SMTP_PASSWORD, SMTP_SERVICE } = process.env,
        transporter = nodemailer.createTransport({
            host: SMTP_SERVICE,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: SMTP_USER, // generated ethereal user
                pass: SMTP_PASSWORD, // generated ethereal password
            },
        });
    transporter.verify().then((err, success) => {
        serverDebugger('Mail transporter working successfully')
    }).catch((error) => {
        errorDebugger('Mail transporter error', error.message);
    })
    const sendMail = async ({
        from = SMTP_USER,
        to, subject, html
    }) => {
        let info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
        });
        return info;
    };

    module.exports = {
        sendMail
    };
})();