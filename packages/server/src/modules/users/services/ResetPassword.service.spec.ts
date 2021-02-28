import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPassword.service';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUserTokenRepository;
let hashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUserTokenRepository();
    hashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      hashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    await resetPasswordService.execute({ password: '123123', token });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toBeCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset if the userToken does not exits', async () => {
    await expect(
      resetPasswordService.execute({ password: '123123', token: 'tokenfake' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset if the user does not exits', async () => {
    const { token } = await fakeUsersTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPasswordService.execute({ password: '123123', token }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset if has passed 2h after the request', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({ password: '123123', token }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
