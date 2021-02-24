import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUser.service';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvicer: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvicer = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvicer);
  });

  it('should be able to create user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    const user = await createUser.execute(userData);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with alredy used email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    await createUser.execute(userData);

    await expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });
});
