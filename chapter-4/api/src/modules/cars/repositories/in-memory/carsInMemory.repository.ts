import { Car } from '../../infra/typeorm/entities/car'
import { ICarsRepository } from '../iCars.repository';
import { ICreateCarDTO } from '../../dtos/iCreateCar.dto';
import { IFindAvailableFilters } from '@modules/cars/dtos/iFindAvailableFilters.dto';

class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car;
    Object.assign(car, data);
    car.available = true;
    this.cars.push(car);
    return car;
  }

  async findAvailable(filterData?: IFindAvailableFilters): Promise<Car[]> {
    let availableCars = this.cars.filter((car) => car.available);
    if (!filterData.name && !filterData.brand && !filterData.category_id) return availableCars;
    availableCars = availableCars.filter((car) => {
      if (car.name === filterData.name) return true;
      if (car.brand === filterData.brand) return true;
      if (car.category === filterData.category_id) return true;
      return false;
    });

    return availableCars;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === id)
  }

  async findByLicencePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }

}

export { CarsRepositoryInMemory };