import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowUserProfileService from '@modules/users/services/ShowUserProfile.service';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfile.service';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const user = await showUserProfile.execute(id);

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, old_password, password } = request.body;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const user = await updateUserProfile.execute({
      user_id: id,
      name,
      email,
      oldPassword: old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}

export default ProfileController;
