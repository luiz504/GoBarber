import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailability.service';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { day, month, year } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const appointments = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default ProviderDayAvailabilityController;
