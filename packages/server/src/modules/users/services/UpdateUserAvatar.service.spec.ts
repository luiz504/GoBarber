// import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
// import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
// import AuthenticateUserService from './AuthenticateUser.service';
// import CreateUserService from './CreateUser.service';

// describe('UpdateUserAvatar', () => {
//   it('should be able to authenticate', async () => {
//     const fakeUserRepository = new FakeUsersRepository();
//     const fakeHashProvicer = new FakeHashProvider();

//     const createUser = new CreateUserService(
//       fakeUserRepository,
//       fakeHashProvicer,
//     );

//     const authenticateUser = new AuthenticateUserService(
//       fakeUserRepository,
//       fakeHashProvicer,
//     );

//     const userData = {
//       name: 'John Doe',
//       email: 'johndoe@email.com',
//       password: '123456',
//     };

//     const user = await createUser.execute(userData);

//     const auth = await authenticateUser.execute({
//       email: userData.email,
//       password: userData.password,
//     });

//     expect(auth).toHaveProperty('token');
//     expect(auth.user).toEqual(user);
//   });
// });
