import 'reflect-metadata';
import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/repositories/categories.repository';
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications.repository';
import { UsersRepository } from '../../modules/accounts/repositories/users.repository';


container.registerSingleton<CategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<SpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  UsersRepository
);