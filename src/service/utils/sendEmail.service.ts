import nodemailer from 'nodemailer';

const SENDGRID = {
    SENDGRID_USER: 'phanhoang741@gmail.com',
    SENDGRID_PASSWORD: 'BypvRDf@46KpHbvasdasd',
    SENDGRID_API_KEY: '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',
    SENDGRID_DEFAULT: 'apikey'
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
                user: SENDGRID.SENDGRID_DEFAULT,
                pass: SENDGRID.SENDGRID_API_KEY,
            },
        });
    }

    public createMailOptions(options: IMailOptions) {
        this.mailOptions = {
            headers: {
                'Authorization': `Bearer ${SENDGRID.SENDGRID_API_KEY}`,
            },
            from: SENDGRID.SENDGRID_USER, // sender address
            to: options.toEmail, // list of receivers
            subject: options.subject, // Subject line
            text: options.text, // plaintext body
            html: options.html, // html body
        };
    }

    public async sendMail() {
        return await this.transporter.sendMail(this.mailOptions)
    }
}
