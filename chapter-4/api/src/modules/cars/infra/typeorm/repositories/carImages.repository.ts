import { Repository } from 'typeorm';
import { ICarsImagesRepository } from '@modules/cars/repositories/iCarsImages.repository';
import { CarImage } from '../entities/CarImage';
import { AppDataSource } from '@shared/infra/database/data-source';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };