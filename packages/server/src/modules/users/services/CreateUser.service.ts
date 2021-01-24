import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const usersRepository = getRepository(User);

    const findUserExists = await usersRepository.findOne({ where: { email } });

    if (findUserExists) {
      throw new AppError('Email Already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
