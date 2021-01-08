import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';

import uploadConfig from '../config/upload';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only Authenticated users can change avatar');
    }

    if (user.avatar) {
      // delete previous avatar
      const { directory } = uploadConfig;
      const userAvatarFilePath = path.join(directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
