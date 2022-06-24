import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './resetPassword.useCase';

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;
    const resetPasswordUseCase = container.resolve(
      ResetPasswordUseCase
    );

    await resetPasswordUseCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordUserController };