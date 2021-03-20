import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointments.service';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers appointments by a day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'users',
      date: new Date(2021, 3, 12, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2021, 3, 12, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2021,
      month: 4,
      day: 12,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
  it('should be able to list the providers appointments by a day and cache the result of the  request', async () => {
    const appointment = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'users',
      date: new Date(2021, 3, 12, 14, 0, 0),
    });

    const recoverCache = jest.spyOn(fakeCacheProvider, 'recover');
    const saveCache = jest.spyOn(fakeCacheProvider, 'save');
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2021,
      month: 4,
      day: 12,
    });

    expect(appointments).toEqual([appointment]);
    expect(recoverCache).toHaveBeenCalled();
    expect(saveCache).toHaveBeenCalled();
  });
});
