import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfile.service';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update user profile data', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'Oliver Doe',
      email: 'oliverdoe@email.com',
    });

    expect(updatedUser.name).toBe('Oliver Doe');
    expect(updatedUser.email).toBe('oliverdoe@email.com');
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'non-existing-id',
        name: 'John Doe',
        email: 'johndoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change email to a already used one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Oliver Doe',
      email: 'oliverdoe@email.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'oliverdoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const userUpdated = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@email.com',
      oldPassword: '123456',
      password: '123123',
    });

    expect(userUpdated.password).toBe('123123');
  });

  it('Should not be able to update the password without  old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',

        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@email.com',
        oldPassword: 'wrongPassword',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
