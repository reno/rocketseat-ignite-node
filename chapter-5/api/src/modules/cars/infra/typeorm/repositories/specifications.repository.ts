import { Repository, In } from 'typeorm';
import { Specification } from '../entities/specification';
import { AppDataSource } from '@shared/infra/database/data-source'
import { ISpecificationsRepository, ICreateSpecificationDTO } from '@modules/cars/repositories/iSpecifications.repository'


class SpecificationsRepository implements ISpecificationsRepository {
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

  async findByIds(ids: string[]): Promise<Specification[] | undefined> {
    return this.repository.findBy({
      id: In(ids)
    });
  }
}

export { SpecificationsRepository, ICreateSpecificationDTO };