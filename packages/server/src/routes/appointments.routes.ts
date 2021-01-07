import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  try {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      return response
        .status(400)
        .json({ message: ' This Hour is already booked' });
    }

    const appoinment = appointmentsRepository.create({
      provider,
      date: parsedDate,
    });

    return response.json(appoinment);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default appointmentsRouter;
