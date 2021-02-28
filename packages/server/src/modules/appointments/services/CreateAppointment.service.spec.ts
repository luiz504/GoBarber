import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointment.service';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('Should be able to create a new appointment', async () => {
    const appointmentData = {
      date: new Date(),
      provider_id: '111111',
    };

    const appointment = await createAppointment.execute(appointmentData);

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(appointmentData.provider_id);
  });

  it('Should not be able to create two appointments on the same time', async () => {
    const appointmentData = { date: new Date(), provider_id: '111111' };

    await createAppointment.execute(appointmentData);
    await expect(
      createAppointment.execute(appointmentData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
