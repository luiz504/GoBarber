import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUser.service';

describe('CreateUser', () => {
  it('should be able to create user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvicer = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvicer,
    );

    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    const user = await createUser.execute(userData);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user with alredy used email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvicer = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvicer,
    );

    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    await createUser.execute(userData);

    expect(createUser.execute(userData)).rejects.toBeInstanceOf(AppError);
  });
});
