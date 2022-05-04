import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "039a9d5342573a",
    pass: "7ad5851727edce"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail (data: SendMailData) {
    const { subject, body } = data
    await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Yan Soares <yts.1995@gmail.com>',
    subject,
    html: body
  })
  }
}