import { inject, injectable } from 'tsyringe'
import { Category } from "../../entities/category";
import { CategoriesRepository } from '../../repositories/categories.repository';

@injectable()
class ListCategoriesUseCase {

  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
    ) {}

  async execute(): Promise<Category[]> {
    return await this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };