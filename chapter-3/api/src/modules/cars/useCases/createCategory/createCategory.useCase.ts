import { AppError } from '../../../../errors/appError';
import { inject, injectable } from 'tsyringe'
import { Category } from "../../entities/category";
import { CategoriesRepository, ICreateCategoryDTO } from '../../repositories/categories.repository';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({name, description}: ICreateCategoryDTO): Promise<Category> {
    const alreadyExists = await this.categoriesRepository.findByName(name);
    if (alreadyExists) {
      throw new AppError('Category already exists', 401);
    }
    return this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };