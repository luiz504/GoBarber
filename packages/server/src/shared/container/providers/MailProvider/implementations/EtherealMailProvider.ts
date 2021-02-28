import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMainProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const traporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = traporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'GoBarber staff <staff@gobarber.com',
      to,
      subject: 'Recover Password',
      text: body,
    });

    console.log('Message sent:', message.messageId); //eslint-disable-line
    console.log('Preview URL:', nodemailer.getTestMessageUrl(message)); //eslint-disable-line
  }
}

export default EtherealMailProvider;
