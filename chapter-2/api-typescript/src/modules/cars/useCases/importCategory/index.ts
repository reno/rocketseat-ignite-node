import { CategoriesRepository } from '../../repositories/categories.repository';
import { ImportCategoryUseCase } from './importCategory.useCase';
import { ImportCategoryController } from './importCategory.controller';


const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };