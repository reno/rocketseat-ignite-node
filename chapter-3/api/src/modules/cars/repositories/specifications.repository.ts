import { Specification } from '../models/specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

class SpecificationsRepository {
  private specifications: Specification[];
  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }
    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification(); 
    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });
    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(specification => specification.name === name);
  }

}

export { SpecificationsRepository, ICreateSpecificationDTO };