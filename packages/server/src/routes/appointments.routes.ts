import { Router } from 'express';
import { v4 } from 'uuid';

const appointmentsRouter = Router();

appointmentsRouter.post(`/`, (request, response) => {
  const { provider, date } = request.body;
  const user = {
    provider,
    date,
    id: v4(),
  };
  return response.json(user);
});

export default appointmentsRouter;
