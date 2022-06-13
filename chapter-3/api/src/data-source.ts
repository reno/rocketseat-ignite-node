import { DataSource } from 'typeorm'
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'ignite',
  logging: true,
  entities: [join(__dirname, 'modules', '**', 'entities', '*.{ts,js}')],
  subscribers: [],
  migrations: [join(__dirname, 'database', 'migrations', '*.{ts,js}')],
})
