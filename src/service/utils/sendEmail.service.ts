import nodemailer from 'nodemailer';

const SENDGRID = {
    SENDGRID_USER: 'phanhoang741@gmail.com',
    SENDGRID_PASSWORD: 'BypvRDf@46KpHbvasdasd',
};
export interface IMailOptions {
    toEmail: string;
    subject: string;
    text: string;
    html: string;
}

export default class SendEmailService {
    private mailOptions: nodemailer.SendMailOptions;
    public transporter: nodemailer.Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: SENDGRID.SENDGRID_USER,
                pass: SENDGRID.SENDGRID_PASSWORD,
            },
        });
    }

    public createMailOptions(options: IMailOptions) {
        this.mailOptions = {
            from: SENDGRID.SENDGRID_USER, // sender address
            to: options.toEmail, // list of receivers
            subject: options.subject, // Subject line
            text: options.text, // plaintext body
            html: options.html, // html body
        };
    }

    public sendMail() {
        return this.transporter.sendMail(this.mailOptions).catch((err) => {
            console.log(err);
            return;
        });
    }
}
