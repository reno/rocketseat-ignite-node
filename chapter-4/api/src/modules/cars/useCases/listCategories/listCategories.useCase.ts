import { inject, injectable } from 'tsyringe'
import { Category } from "../../infra/typeorm/entities/category";
import { ICategoriesRepository } from '@modules/cars/repositories/iCategories.repository';

@injectable()
class ListCategoriesUseCase {

  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
    ) {}

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };