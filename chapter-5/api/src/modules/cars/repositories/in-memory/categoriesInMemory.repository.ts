import { Category } from '../../infra/typeorm/entities/category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../iCategories.repository'

class CategoriesRepositoryInMemory implements ICategoriesRepository {

  categories: Category[] = []; 
 
  async findByName(name: string):  Promise<Category | undefined> {
    return this.categories.find((category) => category.name === name)
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();
    Object.assign(category, {
      name, description
    });
    this.categories.push(category)
    return category;
  }  
}

export { CategoriesRepositoryInMemory };