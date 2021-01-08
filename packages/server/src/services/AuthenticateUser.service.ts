import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw Error('Incorrect email/password combination');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
