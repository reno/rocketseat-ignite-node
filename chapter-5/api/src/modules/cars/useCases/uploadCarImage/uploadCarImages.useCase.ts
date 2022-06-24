import { inject, injectable } from 'tsyringe';
import { ICarsImagesRepository } from '@modules/cars/repositories/iCarsImages.repository';

interface IRequest {
  car_id: string;
  image_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}
  async execute({ car_id, image_names }: IRequest): Promise<void> {
    image_names.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      //await this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImagesUseCase };