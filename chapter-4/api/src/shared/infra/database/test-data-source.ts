import { DataSource } from 'typeorm'

const TestDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ignite',  
  logging: false,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  subscribers: [],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
})

export { TestDataSource };