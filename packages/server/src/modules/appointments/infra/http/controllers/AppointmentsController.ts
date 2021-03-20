import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointment.service';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const newAppointment = await createAppointment.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(newAppointment);
  }
}

export default AppointmentsController;
