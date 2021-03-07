import ListProvidersService from '@modules/appointments/services/ListProviders.service';
import User from '@modules/users/infra/typeorm/entities/User';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    const providersNoPw = providers.map(provider => {
      const providerClone: Partial<User> = provider;
      delete providerClone.password;
      return providerClone;
    });

    return response.json(providersNoPw);
  }
}

export default ProvidersController;
