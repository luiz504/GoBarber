import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

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

    const appoinment = appointmentsRepository.create(provider, parsedDate);

    return response.json(appoinment);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default appointmentsRouter;
