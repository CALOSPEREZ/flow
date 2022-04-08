
import nodemailer from 'nodemailer';
import { handleError, handleResponse } from '@middleware/errorHandlers'
import { message } from '@config/message'
let email = null;

export const send_email = async (req, res) => {
    try {

        const { nombre, telefono, plan, descripcion, fromEmail, costo } = req.body
        if (!email) {
            email = await nodemailer.createTransport({
                // host: "smtp.gmail.com",
                // port: 587,
                // secure: false,
                // auth: {
                //     user: 'dcyt2019@gmail.com', // usuario del correo
                //     pass: 'jeiddsfncprforru' // generat
                // },
                // tls: {
                //     rejectUnauthorized: false
                // }
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

        let info = await email.sendMail({
            from: `<${fromEmail}>`, // sender address
            to: `carlosperez@lavenir.com.co`, // list of receivers
            subject: "Solicitud de servicio", // Subject line
            html: `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=
                 , initial-scale=1.0">
                <title>email</title>
            </head>
            
            <body>
                <style>
                    table {
                        border-collapse: separate;
                        border-spacing: 5px;
                         
                        color: #fff;
                    }
            
                    td,
                    th {
                        background: #fff;
                        color: #000;
                    }
                </style>
                <h2 style="
                text-align: center;
            ">
                    Datos del cliente
                </h2>
                <div style="overflow-x: auto;"><table style="
                width: 100%;
                border-collapse: collapse;
                text-align: center;
                border: 1px solid black;
            ">
                    <tbody style="
                border: 1px solid black;
            ">
                        <tr style="
                border: 1px solid black;
            ">
            
                            <td style="
                border: 1px solid black;
            ">nombre del cliente </td>
                            <td style="
                border: 1px solid black;
            ">Telefono</td>
                            <td style="
                border: 1px solid black;
            ">Correo</td>
                            <td style="
                border: 1px solid black;
            ">Plan solicitado</td>
            <td style="
            border: 1px solid black;
            ">Costo</td>
                        </tr>
                        <tr>
            
                            <td style="
                border: 1px solid black;
            ">${nombre}</td>
                            <td style="
                border: 1px solid black;
            ">${telefono} </td>
                            <td style="
                border: 1px solid black;
            ">${fromEmail}</td>
                            <td style="
                border: 1px solid black;
            "> ${plan} </td>
            <td style="
                            border: 1px solid black;
                        "> ${costo} </td>
                        </tr>
            
                    </tbody>
                </table>
                </div>
                
                <h3>descripcion: ${descripcion} </h3>
            
            
            </body>
            
            </html>`
        });
        handleResponse(res, 200, message.create_success, "Correo enviado")
    } catch (error) {
        handleError(error, res)
    }
};