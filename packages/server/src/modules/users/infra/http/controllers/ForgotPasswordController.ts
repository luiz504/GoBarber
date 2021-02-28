import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmail.service';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotrPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotrPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
