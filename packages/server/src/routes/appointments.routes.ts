import { Router } from 'express';
import { v4 } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

interface IAppointment {
  id: string;
  provider: String;
  date: Date;
}

const appointmentsRouter = Router();

const appoinments: IAppointment[] = [];

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

    const appoinment = {
      provider,
      date: parsedDate,
      id: v4(),
    };

    appoinments.push(appoinment);

    return response.json(appoinment);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default appointmentsRouter;
