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
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  subscribers: [],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'custom_migration_table',
})
