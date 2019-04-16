const nodemailer = require("nodemailer");

module.exports = {
     sendRegistrationEmail: async () => {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            auth: {
                user: "",
                pass: ""
            }
        });

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "aquinof@rchsp.med.sa",
            subject: "Registration completed",
            html: "<b>Hello world?</b>"
        });


    },
}