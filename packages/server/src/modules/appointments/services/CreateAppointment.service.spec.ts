import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointment.service';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('Should be able to create a new appointment', async () => {
    const appointmentData = {
      provider_id: '111111',
      user_id: '22222',
      date: new Date(),
    };

    const appointment = await createAppointment.execute(appointmentData);

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(appointmentData.provider_id);
  });

  it('Should not be able to create two appointments on the same time', async () => {
    const appointmentData = {
      provider_id: '111111',
      user_id: '22222',
      date: new Date(),
    };

    await createAppointment.execute(appointmentData);
    await expect(
      createAppointment.execute(appointmentData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
