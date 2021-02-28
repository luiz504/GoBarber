import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMainProvider';

class FakeMailProvider implements IMailProvider {
  private massages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.massages.push(message);
  }
}

export default FakeMailProvider;
