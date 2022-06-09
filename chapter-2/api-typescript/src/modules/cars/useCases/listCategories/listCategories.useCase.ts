import { Category } from "../../models/category";
import { CategoriesRepository } from '../../repositories/categories.repository';

class ListCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };