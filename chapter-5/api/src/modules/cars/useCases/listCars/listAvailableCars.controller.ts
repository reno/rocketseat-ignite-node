import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IFindAvailableFilters } from '../../dtos/iFindAvailableFilters.dto';
import { ListAvailableCarsUseCase } from './listAvailableCars.useCase';

class ListAvailableCarsController {

  async handle(request: Request, response: Response) {
    const filters = request.query as IFindAvailableFilters;
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);
    const cars = await listAvailableCarsUseCase.execute(filters);
    return response.json(cars);
  }
}

export { ListAvailableCarsController };