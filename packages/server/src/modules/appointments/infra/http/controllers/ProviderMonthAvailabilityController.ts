import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailability.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const appointments = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default ProviderMonthAvailabilityController;
