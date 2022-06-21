import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/carsInMemory.repository';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/specificationsInMemory.repository';
import { AppError } from '@shared/errors/appError';
import { CreateCarSpecificationUseCase } from './createCarSpecification.useCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create car specification', () => {

  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('Should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test brand',
      category_id: 'Category'
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });
    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [ specification.id ] 
    });
    expect(carSpecifications).toHaveProperty('specifications');
    expect(carSpecifications.specifications.length).toBe(1);
  });

  it('Should not be able to add a new specification to a inexistent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['5678'];
      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
  
});