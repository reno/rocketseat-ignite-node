import { inject, injectable } from 'tsyringe'
import { Car } from '../../infra/typeorm/entities/car'
import { ICarsRepository } from '@modules/cars/repositories/iCars.repository'
import { IFindAvailableFilters } from '@modules/cars/dtos/iFindAvailableFilters.dto';

@injectable()
class ListAvailableCarsUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(filterData?: IFindAvailableFilters): Promise<Car[]> {
    return await this.carsRepository.findAvailable(filterData);
  }
}

export { ListAvailableCarsUseCase };