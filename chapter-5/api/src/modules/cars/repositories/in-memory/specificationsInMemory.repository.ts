import { Specification } from '@modules/cars/infra/typeorm/entities/specification';
import { ISpecificationsRepository, ICreateSpecificationDTO } from '../iSpecifications.repository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, data);
    this.specifications.push(specification);
    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name);
  }
  
  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }
}

export { SpecificationsRepositoryInMemory };