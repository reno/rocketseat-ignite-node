import { Repository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dtos/iCreateCar.dto';
import { IFindAvailableFilters } from '@modules/cars/dtos/iFindAvailableFilters.dto';
import { ICarsRepository } from '@modules/cars/repositories/iCars.repository';
import { AppDataSource } from '@shared/infra/database/data-source'
import { Car } from '../entities/car';

class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data); 
    await this.repository.save(car);
    return car;
  }

  async findAvailable(filterData?: IFindAvailableFilters): Promise<Car[]> {
    const query =  this.repository
      .createQueryBuilder('car')
      .where('available = :available', { available: true });
      if (filterData?.name) {
        query.andWhere('car.name = :name', { name: filterData.name });
      }
      if (filterData?.brand) {
        query.andWhere('car.brand = :brand', { brand: filterData.brand });
      }
      if (filterData?.category_id) {
        query.andWhere('car.category = :category', { category: filterData.category_id });
      }
      return await query.getMany();
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      where: {
        id
      },
      relations: ['category', 'specifications']
    });
    return car;
  }

  async findByLicencePlate(license_plate: string): Promise<Car | undefined> {
    return await this.repository.findOne({
      where: {
        license_plate
      }
    });
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };