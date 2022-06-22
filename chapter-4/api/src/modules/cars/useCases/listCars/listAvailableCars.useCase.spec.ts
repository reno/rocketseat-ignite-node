import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/carsInMemory.repository';
import { ListAvailableCarsUseCase } from './listAvailableCars.useCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory

describe('ListCarsUseCase', () => {

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it('Should be able to list all cars available', async () => {
    const car = await carsRepository.create({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 50,
      brand: 'Volkswagen',
      category_id: 'Category ID',
    });
    const availableCars = await listCarsUseCase.execute({});
    expect(availableCars).toContainEqual(car);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepository.create({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 50,
      brand: 'Volkswagen',
      category_id: 'Category ID',
    });
    const availableCars = await listCarsUseCase.execute({ name: car.name});
    expect(availableCars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepository.create({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 50,
      brand: 'Volkswagen',
      category_id: 'Category ID',
    });
    const availableCars = await listCarsUseCase.execute({ brand: car.brand});
    expect(availableCars).toContainEqual(car);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepository.create({
      name: 'Test car',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 50,
      brand: 'Volkswagen',
      category_id: 'Category ID',
    });
    const availableCars = await listCarsUseCase.execute({ category_id: car.category_id });
    expect(availableCars).toContainEqual(car);
  });
});
