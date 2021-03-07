import { getHours, isBefore, startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appoinmentDate = startOfHour(date);

    if (provider_id === user_id) {
      throw new AppError("You can't create an appointmet with yourself");
    }

    if (isBefore(appoinmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (getHours(appoinmentDate) < 8 || getHours(appoinmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appoinmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This Hour is already booked');
    }

    const appoinment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appoinmentDate,
    });

    return appoinment;
  }
}

export default CreateAppointmentService;
