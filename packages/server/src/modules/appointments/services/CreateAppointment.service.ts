import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  date: Date;
  provider_id: string;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appoinmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appoinmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This Hour is already booked');
    }

    const appoinment = await this.appointmentsRepository.create({
      provider_id,
      date: appoinmentDate,
    });

    return appoinment;
  }
}

export default CreateAppointmentService;
