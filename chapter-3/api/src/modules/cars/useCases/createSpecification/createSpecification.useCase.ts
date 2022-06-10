import { Specification } from '../../models/specification';
import { SpecificationsRepository, ICreateSpecificationDTO } from '../../repositories/specifications.repository';


class CreateSpecificationUseCase {

  constructor(private readonly specificationsRepository: SpecificationsRepository) {}

  execute({ name, description }: ICreateSpecificationDTO) {
    const alreadyExists = this.specificationsRepository.findByName(name);
    if (alreadyExists) {
      throw new Error('Specification already exists');
    }
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };