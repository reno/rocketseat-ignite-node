import { inject, injectable } from 'tsyringe'
import { ISpecificationsRepository, ICreateSpecificationDTO } from '@modules/cars/repositories/iSpecifications.repository';
import { AppError } from '@shared/errors/appError';

@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
    ) {}

  async execute({ name, description }: ICreateSpecificationDTO) {
    const alreadyExists = await this.specificationsRepository.findByName(name);
    if (alreadyExists) {
      throw new AppError('Specification already exists', 401);
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };