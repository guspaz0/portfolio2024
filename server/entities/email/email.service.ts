import { google } from "googleapis";
import nodemailer, { Transporter } from 'nodemailer'
import SMTPConnection from "nodemailer/lib/smtp-connection";
import { MailRequestDto } from "./mailRequestDto";

const {
    NUXT_GOOGLE_EMAIL,
    NUXT_GOOGLE_CLIENT_ID, 
    NUXT_GOOGLE_CLIENT_SECRET,
    NUXT_GOOGLE_REFRESH_TOKEN 
} = process.env


async function getGoogleAccessToken() {
    const oauth2Client = new google.auth.OAuth2(
        NUXT_GOOGLE_CLIENT_ID,
        NUXT_GOOGLE_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: NUXT_GOOGLE_REFRESH_TOKEN,
    });

    return await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log("*ERR: ", err)
                reject(err);
            }
            resolve(token); 
        });
    });
}

class EmailService {
    transporter: Transporter;

    constructor() {
        this.#init()
    }

    async #init() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: NUXT_GOOGLE_EMAIL,
                accessToken: await getGoogleAccessToken(),
                clientId: NUXT_GOOGLE_CLIENT_ID,
                clientSecret: NUXT_GOOGLE_CLIENT_SECRET,
                refreshToken: NUXT_GOOGLE_REFRESH_TOKEN
            },
        } as SMTPConnection.Options);
    }

    async sendEmail(mail: MailRequestDto) {
        return await this.transporter.sendMail({
            ...mail,
            from: `App Portfolio <${NUXT_GOOGLE_EMAIL}>`,
            to: mail.to || `Gustavo Paz <${NUXT_GOOGLE_EMAIL}>`,
            cc: `App Portfolio <${mail.from}>`,
            html: this.#htmlTemplate(mail)
        });
    }

    #htmlTemplate(mail: MailRequestDto) { 
        return`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Web</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    color: #007BFF;
                }
                p {
                    color: #333333;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #999999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hola, ${mail.from}!</h1>
                <p>Este correo fue enviado por la APP Portfolio y se te envio una copia CC.</p>
                <p>Agreadezco tu interes en contactarte. Me pondre en contacto a la brevedad.</p>
                <p>Mis mejores deseos,<br>Gustavo Paz</p>
            </div>
            <main>
                <h3>Mensaje</h3>
                <p>${mail.text}</p>
            </main>
            <div class="footer">
                <p>Copyright © 2026 Gustavo Rodolfo Paz. Todos los derechos reservados.</p>
            </div>
            <p>Si crees que este mensaje te llego por error, por favor eliminalo<p>
        </body>
        </html>
    `;
    }
}

export default new EmailService()