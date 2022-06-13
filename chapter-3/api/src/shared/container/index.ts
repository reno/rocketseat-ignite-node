import 'reflect-metadata';
import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/repositories/categories.repository';
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications.repository';

container.registerSingleton<CategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<SpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);