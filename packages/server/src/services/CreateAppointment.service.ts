import { startOfHour } from 'date-fns';

import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface IRequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  public async execute({ date, provider }: IRequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appoinmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appoinmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This Hour is already booked');
    }

    const appoinment = appointmentsRepository.create({
      provider,
      date: appoinmentDate,
    });

    await appointmentsRepository.save(appoinment);

    return appoinment;
  }
}

export default CreateAppointmentService;
