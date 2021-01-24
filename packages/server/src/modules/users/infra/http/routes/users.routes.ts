import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUser.service';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar.service';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const uploadMiddleware = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadMiddleware.single('avatar'),
  async (request, response) => {
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
  },
);

export default usersRouter;
