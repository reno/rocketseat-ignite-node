import { DataSource } from 'typeorm'
import { join } from 'path';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'ignite',
  logging: true,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  subscribers: [],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
})

const TestDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'ignite-test',
  logging: true,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  subscribers: [],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
})

export { AppDataSource, TestDataSource };
