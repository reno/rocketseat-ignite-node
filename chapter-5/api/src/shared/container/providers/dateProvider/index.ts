import { container } from 'tsyringe';
import { IDateProvider } from './iDateProvider';
import { DayjsDateProvider } from './implementations/dayjsDateProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider
);