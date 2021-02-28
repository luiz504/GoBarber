import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from './ShowUserProfile.service';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('should be able to get the user Profile data by Id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123123',
    });

    const profile = await showUserProfile.execute(user.id);

    expect(profile.id).toBe(user.id);
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@email.com');
  });

  it('should not be able to show the profile from a non-existing user', async () => {
    await expect(
      showUserProfile.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
