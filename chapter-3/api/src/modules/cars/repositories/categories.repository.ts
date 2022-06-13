import { Repository } from 'typeorm';
import { Category } from '../entities/category';
import { AppDataSource } from '../../../data-source'

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description }); 
    await this.repository.save(category);
    return category;
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({
      where: { name }
    });
  }
}

export { CategoriesRepository, ICreateCategoryDTO };