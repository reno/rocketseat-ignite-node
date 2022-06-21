import 'reflect-metadata';
import { container } from 'tsyringe';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/categories.repository';
import { ICategoriesRepository } from '@modules/cars/repositories/iCategories.repository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/specifications.repository';
import { ISpecificationsRepository } from '@modules/cars/repositories/iSpecifications.repository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/users.repository';
import { IUsersRepository } from '@modules/accounts/repositories/iUsers.repository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/cars.repository';
import { ICarsRepository } from '@modules/cars/repositories/iCars.repository';
import { ICarsImagesRepository } from '@modules/cars/repositories/iCarsImages.repository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/carImages.repository';
import { IRentalsRepository } from '@modules/rentals/repositories/iRentals.repository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/rentals.repository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);