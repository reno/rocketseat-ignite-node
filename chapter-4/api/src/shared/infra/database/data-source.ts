import { DataSource } from 'typeorm'
import { join } from 'path';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ignite',
  logging: false,
  synchronize: false,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  subscribers: [],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
})

// const TestDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'ignite',  
//   logging: false,
//   //synchronize: true,
//   entities: ['./src/modules/**/infra/typeorm/entities/index.ts'],
//   subscribers: [],
//   migrations: ['./src/shared/infra/database/migrations/*.ts'],
// })

export { AppDataSource };
