import { Repository } from 'typeorm';
import { Category } from '../entities/category';
import { AppDataSource } from '@shared/infra/database/data-source'
import { ICategoriesRepository, ICreateCategoryDTO } from '@modules/cars/repositories/iCategories.repository'

class CategoriesRepository implements ICategoriesRepository  {
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