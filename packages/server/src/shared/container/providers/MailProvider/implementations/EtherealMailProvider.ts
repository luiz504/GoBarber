import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMainProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
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

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Gobarber Staff',
        address: from?.email || 'staff@gobarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent:', message.messageId); //eslint-disable-line
    console.log('Preview URL:', nodemailer.getTestMessageUrl(message)); //eslint-disable-line
  }
}

export default EtherealMailProvider;
