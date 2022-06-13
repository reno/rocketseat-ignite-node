import { Repository } from 'typeorm';
import { Specification } from '../entities/specification';
import { AppDataSource } from '../../../data-source'

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class SpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description }); 
    await this.repository.save(specification);
    return specification;
  }

  async list(): Promise<Specification[]> {
     return this.repository.find();
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.repository.findOne({
      where: { name }
    });
  }

}

export { SpecificationsRepository, ICreateSpecificationDTO };