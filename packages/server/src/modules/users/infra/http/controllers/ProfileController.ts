import ShowUserProfileService from '@modules/users/services/ShowUserProfile.service';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfile.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import User from '../../typeorm/entities/User';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const user: Partial<User> = await showUserProfile.execute(id);

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, oldPassword, password } = request.body;

    const updateUserProfile = container.resolve(UpdateUserProfileService);

    const user = await updateUserProfile.execute({
      user_id: id,
      name,
      email,
      oldPassword,
      password,
    });

    // delete user.password;

    return response.json(user);
  }
}

export default ProfileController;
