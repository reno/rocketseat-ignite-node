import { CategoriesRepository } from '../../repositories/categories.repository';
import { CreateCategoryUseCase } from './createCategory.useCase';
import { CreateCategoryController } from './createCategory.controller';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(createCategoryUseCase);

export { createCategoryController };