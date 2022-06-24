import { CreateCarUseCase } from './createCar.useCase'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/carsInMemory.repository'
import { AppError } from '@shared/errors/appError'

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create a car', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it('Should be able to create a car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test brand',
      category_id: 'Category'
    });
    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with duplicated license plate' , async () => {
    await createCarUseCase.execute({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test brand',
      category_id: 'Category'
    });
    await expect(createCarUseCase.execute({
        name: 'Test car',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Test brand',
        category_id: 'Category'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Created cars should be available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test brand',
      category_id: 'Category'
    });
    expect(car.available).toBe(true);
  });

})