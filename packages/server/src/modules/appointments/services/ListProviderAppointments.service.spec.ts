import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointments.service';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let ListProviderAppointments: ListProviderAppointmentsService;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    ListProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
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

    const appointments = await ListProviderAppointments.execute({
      provider_id: 'provider',
      year: 2021,
      month: 4,
      day: 12,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
