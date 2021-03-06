import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatar.service';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatedUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updatedUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it("should be able to update the user's avatar", async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    const user = await fakeUsersRepository.create(userData);

    const updatedUser = await updatedUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'fakeImage.jpg',
    });

    expect(updatedUser.avatar).toBe('fakeImage.jpg');
  });

  it('should not be able to update avatar from a non existing user', async () => {
    await expect(
      updatedUserAvatar.execute({
        user_id: 'non-exitsting-user',
        avatarFileName: 'fakeImage.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const userData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    };

    const user = await fakeUsersRepository.create(userData);

    await updatedUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'fakeImage.jpg',
    });

    const updatedUser = await updatedUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'fakeImage2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('fakeImage.jpg');
    expect(updatedUser.avatar).toBe('fakeImage2.jpg');
  });
});
