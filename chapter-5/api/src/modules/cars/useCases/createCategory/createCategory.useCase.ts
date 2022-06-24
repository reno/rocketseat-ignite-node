import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/appError';
import { Category } from '../../infra/typeorm/entities/category';
import { ICategoriesRepository, ICreateCategoryDTO } from '@modules/cars/repositories/iCategories.repository'

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
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