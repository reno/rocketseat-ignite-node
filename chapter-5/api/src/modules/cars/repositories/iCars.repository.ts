import { Car } from '../infra/typeorm/entities/car';
import { ICreateCarDTO } from '../dtos/iCreateCar.dto';
import { IFindAvailableFilters } from '../dtos/iFindAvailableFilters.dto';

interface ICarsRepository {

  create(data: ICreateCarDTO): Promise<Car>;
  findAvailable(filterData?: IFindAvailableFilters): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  findByLicencePlate(license_plate: string): Promise<Car | undefined>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };