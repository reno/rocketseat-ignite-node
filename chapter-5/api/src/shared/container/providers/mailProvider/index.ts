import { container } from 'tsyringe';
import { IMailProvider } from './iMailProvider';
import { EtherealMailProvider } from './implementations/etherealMailProvider';

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);