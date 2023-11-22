import * as nodemailer from 'nodemailer';
import { Mailer, SendMailArgs } from './Mailer';

export class NodeMailer implements Mailer {
  send(args: SendMailArgs) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    // transporter.verify().then(console.log).catch(console.error);

    transporter.sendMail(args);
  }
}
