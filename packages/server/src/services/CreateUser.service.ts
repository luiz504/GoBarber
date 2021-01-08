import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/User';

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
      throw Error('Email Already in use');
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
