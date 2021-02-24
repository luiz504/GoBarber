import IMailProvider from '../models/IMainProvider';

interface IMessage {
  to: string;
  body: string;
}

class FakeMailProvider implements IMailProvider {
  private massages: IMessage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.massages.push({ to, body });
  }
}

export default FakeMailProvider;
