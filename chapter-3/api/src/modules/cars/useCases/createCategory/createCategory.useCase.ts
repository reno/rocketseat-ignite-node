import { Category } from "../../models/category";
import { CategoriesRepository, ICreateCategoryDTO } from '../../repositories/categories.repository';

class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  execute({name, description}: ICreateCategoryDTO): Category {
    const alreadyExists = this.categoriesRepository.findByName(name);
    if (alreadyExists) {
      throw new Error('Category already exists');
    }
    return this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };