var nodemailer = require('nodemailer');
let email = null;

export const email_config = () => {
    if (!email) {
        email  = nodemailer.createTransport({
            host: "mail.cartaenqr.me",
            port: 26,
            secure: false,
            auth: {
                user: 'contacto@cartaenqr.me', // usuario del correo
                pass: 'ek5{9JOuS=hC' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }
    return email;
}
