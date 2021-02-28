import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    oldPassword,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const alreadyUsedEmail = await this.usersRepository.findByEmail(email);

    if (alreadyUsedEmail && alreadyUsedEmail.id !== user_id) {
      throw new AppError('Email already in use');
    }

    if (password && !oldPassword) {
      throw new AppError('Old password is required to change password');
    }

    if (password && oldPassword) {
      const oldPasswordMatches = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!oldPasswordMatches) {
        throw new AppError('Old Password does not match');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserProfileService;
