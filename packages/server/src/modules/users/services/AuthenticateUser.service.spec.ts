import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUser.service';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvicer: FakeHashProvider;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvicer = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvicer,
    );
  });

  it('should be able to authenticate', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    const user = await fakeUsersRepository.create(userData);

    const auth = await authenticateUser.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should be able to authenticate within non existing user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    await expect(
      authenticateUser.execute({
        email: userData.email,
        password: userData.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    await fakeUsersRepository.create(userData);

    await expect(
      authenticateUser.execute({
        email: userData.email,
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
