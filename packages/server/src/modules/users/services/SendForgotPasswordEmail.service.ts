import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMainProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private emailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User doen't exists.");
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.emailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: 'Password Recovery',
      templateData: {
        template: 'Hello, {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
