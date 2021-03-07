import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProviders.service';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Michael Doe',
      email: 'michaeldoe@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Fradie Doe',
      email: 'fradiedoe@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers.length).toBe(2);
    expect(providers).toEqual([user1, user2]);
  });
});
