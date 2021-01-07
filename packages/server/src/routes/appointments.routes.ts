import { Router } from 'express';
import { v4 } from 'uuid';

const appointmentsRouter = Router();

const appoinments = [];

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const appoinment = {
      provider,
      date,
      id: v4(),
    };

    appoinments.push(appoinment);

    return response.json(appoinment);
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default appointmentsRouter;
