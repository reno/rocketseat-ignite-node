import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { ICarsRepository } from '../../repositories/iCars.repository'
import { ICreateCarDTO } from '@modules/cars/dtos/iCreateCar.dto'
import { Car } from '@modules/cars/infra/typeorm/entities/car'
import { AppError } from '@shared/errors/appError'

@injectable()
class CreateCarUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: ICreateCarDTO): Promise<Car> {
    const alreadyExists = await this.carsRepository.findByLicencePlate(data.license_plate);
    if (alreadyExists) {
      throw new AppError('Car already exists', 400);
    }
    return await this.carsRepository.create(data);
  } 
}

export { CreateCarUseCase }