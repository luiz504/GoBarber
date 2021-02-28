import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import CreateUserService from './CreateUser.service';
import SendForgotPasswordEmailService from './SendForgotPasswordEmail.service';

let fakeHashProvicer: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let createUser: CreateUserService;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeHashProvicer = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeMailProvider = new FakeMailProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvicer);
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sentEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });
    expect(sentEmail).toHaveBeenCalled();
  });

  it('should not be able to send e-mail to non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'johndoe@email.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
