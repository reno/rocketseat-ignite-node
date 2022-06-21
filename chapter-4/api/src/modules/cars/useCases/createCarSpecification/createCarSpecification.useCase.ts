import { ICreateCarSpecificationDTO } from '@modules/cars/dtos/iCreateCarSpecification.dto';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ICarsRepository } from '@modules/cars/repositories/iCars.repository';
import { ISpecificationsRepository } from '@modules/cars/repositories/iSpecifications.repository';
import { AppError } from '@shared/errors/appError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCarSpecificationUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(data: ICreateCarSpecificationDTO): Promise<Car> {
    const car = await this.carsRepository.findById(data.car_id);
    if (!car) {
      throw new AppError('Car does not exist', 400);
    }
    const specifications = await this.specificationsRepository.findByIds(data.specifications_id);
    car.specifications = specifications;
    return await this.carsRepository.create({ ...car, category_id: car.category });
  }
}

export { CreateCarSpecificationUseCase };