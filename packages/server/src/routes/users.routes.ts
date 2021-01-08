import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUser.service';

const usersRouter = Router();
const uploadMiddleware = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadMiddleware.single('avatar'),
  async (request, response) => {
    console.log('r', request.file);
    try {
      return response.json('');
    } catch (err) {
      return response.status(400).json(err.message);
    }
  },
);

export default usersRouter;
