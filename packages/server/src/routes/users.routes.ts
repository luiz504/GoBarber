import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUser.service';
import UpdateUserAvatarService from '../services/UpdateUserAvatar.service';

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
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.json({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
        avatar: user.avatar,
      });
    } catch (err) {
      return response.status(400).json(err.message);
    }
  },
);

export default usersRouter;
