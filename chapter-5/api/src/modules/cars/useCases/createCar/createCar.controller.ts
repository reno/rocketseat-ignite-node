import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './createCar.useCase';

class CreateCarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const data = request.body;
    const car = await createCarUseCase.execute(data);
    return response.status(201).json(car);
  }
}

export { CreateCarController }