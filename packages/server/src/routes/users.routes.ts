import { Router } from 'express';

import CreateUserService from '../services/CreateUser.service';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    return response.json({
      name,
      email,
      id: user.id,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (err) {
    return response.status(400).json(err.message);
  }
});

export default usersRouter;
