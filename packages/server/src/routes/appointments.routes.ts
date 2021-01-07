import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appoinments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appoinments.find(appoinment =>
      isEqual(parsedDate, appoinment.date),
    );

    if (findAppointmentInSameDate) {
      return response
        .status(400)
        .json({ message: ' This Hour is already booked' });
    }

    const appoinment = new Appointment(provider, parsedDate);

    appoinments.push(appoinment);

    return response.json(appoinment);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default appointmentsRouter;
