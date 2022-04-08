'use strict'
import Debug from 'debug'
const debug = new Debug('menu:server:api:blog')

'use strict';
var Email = require('email-templates');
var nodemailer = require('nodemailer');


export default {
    enviaremail: async (to, subject, template, data) => {
        var transporter = nodemailer.createTransport({
            host: "mail.cartaenqr.me",
            port: 26,
            secure: true,
            auth: {
                user: 'contacto@cartaenqr.me', // usuario del correo
                pass: 'ek5{9JOuS=hC' // generated ethereal password
            },
            tls:{
              rejectUnauthorized: false
            }
        })
        const email = new Email();
        await Promise
        .all([
            email.render(template, data)
        ])
        .then(async ([ html, text ]) => {
            nodemailer.createTestAccount(async (err, account) => {
                // setup email data with unicode symbols
                let mailOptions = {
                    from: 'contacto@cartaenqr.me', // sender address
                    to: to, // list of receivers
                    // replyTo: 'malorkys.leal@saysgroup.com',
                    subject: subject, // Subject line
                    html: html // html body
                };
                // send mail with defined transport object
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (info) {
                        return console.log(info)
                    }
                    if (error) {
                        return console.log(error);
                    }
                });
            });
        })
        .catch(console.error);

    }
}