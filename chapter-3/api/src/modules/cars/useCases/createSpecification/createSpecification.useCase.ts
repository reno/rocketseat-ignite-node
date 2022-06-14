import { inject, injectable } from 'tsyringe'
import { Specification } from '../../entities/specification';
import { SpecificationsRepository, ICreateSpecificationDTO } from '../../repositories/specifications.repository';
import { AppError } from '../../../../errors/appError';

@injectable()
class CreateSpecificationUseCase {

  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepository
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