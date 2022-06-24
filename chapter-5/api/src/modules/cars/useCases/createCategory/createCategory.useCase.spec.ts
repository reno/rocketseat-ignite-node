import { AppError } from '@shared/errors/appError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/categoriesInMemory.repository';
import { CreateCategoryUseCase } from './createCategory.useCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory


describe('Create category', () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('Should be able to create a new category', async () => {
    const data = {
      name: 'Category test',
      description: 'Category description'
    }
    const category = await createCategoryUseCase.execute(data);
    expect(category).toHaveProperty('id');
  });

  it('Should not be able to create a category with duplicated name', async () => {
    const data = {
      name: 'Category test',
      description: 'Category description'
    }
    await createCategoryUseCase.execute(data);
    await expect(createCategoryUseCase.execute(data)).rejects.toBeInstanceOf(AppError)
  });
});